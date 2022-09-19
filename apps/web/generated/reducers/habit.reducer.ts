/* Do not edit this file. It was generated programmatically. */
// import Habit from "@web/generated/graphql/types/Habit";
import { HabitFragment } from "@web/generated/graphql/fragments/habit.fragment";
import { UserFragment } from "@web/generated/graphql/fragments/user.fragment";
import { HabitCreationInput } from "@web/generated/graphql/inputs/habit.inputs";
import { ID } from "@web/graphql/schema/types";
import { ArrayAction, arrayReducer, Payload } from "@web/utils/data/reduction";

export interface HabitData extends Partial<HabitCreationInput> {
  id?: ID;
}
// export type HabitData = InputData<Habit>;
// export type InitialHabitData = InitialData<Habit, "rank" | "userId">;

export function initializeHabitData(
  data: Partial<HabitData>,
  user?: UserFragment | null | undefined
): Partial<HabitData> {
  const userId = user?.id;
  if (!userId) return data;
  return {
    userId,
    name: "",
    ...Object.fromEntries(Object.entries(data).filter(([, value]) => value !== undefined)), // TODO: make this unnecessary
  };
}

export function habitReducer(state: HabitData, payload: Payload<HabitData>) {
  if (payload.field === "init") return initializeHabitData(payload.value as Partial<HabitData>);
  return { ...state, [payload.field]: payload.value };
}

export function habitsReducer(state: HabitFragment[], action: ArrayAction<HabitFragment>) {
  return arrayReducer<HabitFragment>(state, action);
}
