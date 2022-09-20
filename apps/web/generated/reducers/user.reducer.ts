/* Do not edit this file. It was generated programmatically. */
// import User from "@web/generated/graphql/types/User";
import { UserFragment } from "@web/generated/graphql/fragments/user.fragment";
import { UserCreationInput } from "@web/generated/graphql/inputs/user.inputs";
import { ID } from "@web/graphql/schema/types";
import { ArrayAction, arrayReducer, Payload } from "@web/hooks/reduction";

export interface UserData extends Partial<UserCreationInput> {
  id?: ID;
}
// export type UserData = InputData<User>;
// export type InitialUserData = InitialData<User, "rank" | "userId">;

export function initializeUserData(
  data: Partial<UserData>,
  user?: UserFragment | null | undefined
): Partial<UserData> {
  return {
    email: "",
    ...Object.fromEntries(Object.entries(data).filter(([, value]) => value !== undefined)), // TODO: make this unnecessary
  };
}

export function userReducer(state: UserData, payload: Payload<UserData>) {
  if (payload.field === "init") return initializeUserData(payload.value as Partial<UserData>);
  return { ...state, [payload.field]: payload.value };
}

export function usersReducer(state: UserFragment[], action: ArrayAction<UserFragment>) {
  return arrayReducer<UserFragment>(state, action);
}
