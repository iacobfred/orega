/* Do not edit this file. It was generated programmatically. */
// import Belief from "@/graphql/generated/types/Belief";
import { UserFragment } from "@/graphql/generated/fragments/user.fragment";
import { BeliefCreationInput } from "@/graphql/generated/inputs/belief.inputs";
import { ID } from "@/graphql/schema/types";
import { Payload } from "@/utils/data";

export type BeliefData = Partial<BeliefCreationInput> & { id?: ID };
// export type BeliefData = InputData<Belief>;
// export type InitialBeliefData = InitialData<Belief, "rank" | "userId">;

export function initializeBeliefData(
  data: Partial<BeliefData>,
  user?: UserFragment | null | undefined
): Partial<BeliefData> {
  if (!user) return data;
  return {
    userId: user.id,
    name: "",
    ...Object.fromEntries(Object.entries(data).filter(([, value]) => value !== undefined)), // TODO: make this unnecessary
  };
}

export function beliefDataReducer(state: BeliefData, payload: Payload<BeliefData>) {
  if (payload.field === "init") return initializeBeliefData(payload.value as Partial<BeliefData>);
  return { ...state, [payload.field]: payload.value };
}
