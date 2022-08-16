/* Do not edit this file. It was generated programmatically. */

import { useUser } from "@/components/contexts/UserContext";
import { HabitCreationArgs, HabitUpdateArgs } from "@/graphql/generated/args/habit.args";
import { HabitFragment } from "@/graphql/generated/fragments/habit.fragment";
import {
  CREATE_HABIT,
  updateCacheAfterCreatingHabit,
  UPDATE_HABIT,
} from "@/graphql/generated/mutations/habit.mutations";
import {
  HabitData,
  habitDataReducer,
  initializeHabitData,
} from "@/graphql/generated/reducers/habit.reducer";
import { Payload, useHandleMutation } from "@/utils/data";
import { MutationHookOptions } from "@apollo/client";
import { Dispatch, useEffect, useReducer } from "react";

type HabitCreationMutationHookOptions = MutationHookOptions<
  { createHabit: HabitFragment },
  HabitCreationArgs
>;

export const useCreateHabit = (options?: HabitCreationMutationHookOptions) => {
  return useHandleMutation<{ createHabit: HabitFragment }, HabitCreationArgs>(CREATE_HABIT, {
    ...updateCacheAfterCreatingHabit,
    ...(options ?? {}),
  });
};

type HabitUpdateMutationHookOptions = MutationHookOptions<
  { updateHabit: HabitFragment },
  HabitUpdateArgs
>;

export const useUpdateHabit = (options?: HabitUpdateMutationHookOptions) => {
  return useHandleMutation<{ updateHabit: HabitFragment }, HabitUpdateArgs>(UPDATE_HABIT, options);
};

export const useHabitDataReducer = (
  data?: HabitData
): [HabitData, Dispatch<Payload<HabitData>>] => {
  const user = useUser();
  const starterData = data ?? {};
  const initializedData = initializeHabitData(starterData, user);
  const [habitData, dispatchHabitData] = useReducer(
    habitDataReducer,
    initializedData,
    initializeHabitData
  );
  useEffect(() => {
    if (user?.id && !habitData?.userId) {
      dispatchHabitData({
        field: "init",
        value: initializeHabitData(habitData, user),
      });
    }
  }, [user, habitData]);
  return [habitData, dispatchHabitData];
};
