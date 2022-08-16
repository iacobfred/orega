/* Do not edit this file. It was generated programmatically. */
// import { Habit } from "@/graphql/generated/models/habit.model";
import { UserFragment } from "@/graphql/generated/fragments/user.fragment";
import { HabitCreationInput } from "@/graphql/generated/inputs/habit.inputs";
import { ID } from "@/graphql/schema/types";
import { Payload } from "@/utils/data";

export type HabitData = Partial<HabitCreationInput> & { id?: ID };
// export type HabitData = InputData<Habit>;
// export type InitialHabitData = InitialData<Habit, "rank" | "userId">;

export function initializeHabitData(
  data: Partial<HabitData>,
  user?: UserFragment | null | undefined
): Partial<HabitData> {
  if (!user) return data;
  return {
    userId: user.id,
    name: "",
    ...data,
  };
}

export function habitDataReducer(state: HabitData, payload: Payload<HabitData>) {
  if (payload.field === "init") return initializeHabitData(payload.value as Partial<HabitData>);
  return { ...state, [payload.field]: payload.value };
}
