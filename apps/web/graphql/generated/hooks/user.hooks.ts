/* Do not edit this file. It was generated programmatically. */

import { MutationHookOptions } from "@apollo/client";
import {
  CREATE_USER,
  UPDATE_USER,
  updateCacheAfterCreatingUser,
} from "@web/graphql/generated/mutations/user.mutations";
import { UserFragment } from "@web/graphql/generated/fragments/user.fragment";
import { UserCreationArgs, UserUpdateArgs } from "@web/graphql/generated/args/user.args";
import { useHandleMutation } from "@web/utils/data/mutation";
import { Payload, ArrayAction } from "@web/utils/data/reduction";
import { useReducer, Dispatch } from "react";
import {
  userReducer,
  usersReducer,
  UserData,
  initializeUserData,
} from "@web/graphql/generated/reducers/user.reducer";
import {
  userCreationInputSchema,
  userUpdateInputSchema,
} from "@web/graphql/generated/schemas/user.schemas";
import {
  getOptimisticResponseForUserCreation,
} from "@web/graphql/generated/mutations/user.mutations";

type UserCreationMutationHookOptions = MutationHookOptions<
  { createUser: UserFragment },
  UserCreationArgs
>;

export const useCreateUser = (options?: UserCreationMutationHookOptions) => {
  return useHandleMutation<{ createUser: UserFragment }, UserCreationArgs>(
    CREATE_USER,
    { ...updateCacheAfterCreatingUser, ...(options ?? {}) },
    userCreationInputSchema,
    getOptimisticResponseForUserCreation
  );
};

type UserUpdateMutationHookOptions = MutationHookOptions<
  { updateUser: UserFragment },
  UserUpdateArgs
>;

export const useUpdateUser = (options?: UserUpdateMutationHookOptions) => {
  return useHandleMutation<{ updateUser: UserFragment }, UserUpdateArgs>(
    UPDATE_USER,
    options,
    userUpdateInputSchema
  );
};

export const useUserReducer = (data?: UserData): [UserData, Dispatch<Payload<UserData>>] => {
  const starterData = data ?? {};
  const initializedData = initializeUserData(starterData);
  const [userData, dispatchUserData] = useReducer(userReducer, initializedData, initializeUserData);
  return [userData, dispatchUserData];
};

export const useUsersReducer = (
  data: UserFragment[]
): [UserFragment[], Dispatch<ArrayAction<UserFragment>>] => {
  return useReducer(usersReducer, data);
};
