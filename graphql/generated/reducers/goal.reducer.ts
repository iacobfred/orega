/* Do not edit this file. It was generated programmatically. */
// import Goal from "@/graphql/generated/types/Goal";
import { UserFragment } from "@/graphql/generated/fragments/user.fragment";
import { GoalCreationInput } from "@/graphql/generated/inputs/goal.inputs";
import { ID } from "@/graphql/schema/types";
import { Payload } from "@/utils/data";

export type GoalData = Partial<GoalCreationInput> & { id?: ID };
// export type GoalData = InputData<Goal>;
// export type InitialGoalData = InitialData<Goal, "rank" | "userId">;

export function initializeGoalData(
  data: Partial<GoalData>,
  user?: UserFragment | null | undefined
): Partial<GoalData> {
  if (!user) return data;
  return {
    userId: user.id,
    description: "",
    ...Object.fromEntries(Object.entries(data).filter(([, value]) => value !== undefined)), // TODO: make this unnecessary
  };
}

export function goalDataReducer(state: GoalData, payload: Payload<GoalData>) {
  if (payload.field === "init") return initializeGoalData(payload.value as Partial<GoalData>);
  return { ...state, [payload.field]: payload.value };
}
