/* Do not edit this file. It was generated programmatically. */

import { MutationHookOptions } from "@apollo/client";
import { useUser } from "@web/components/contexts/UserContext";
import { AccountCreationArgs, AccountUpdateArgs } from "@web/generated/graphql/args/account.args";
import { AccountFragment } from "@web/generated/graphql/fragments/account.fragment";
import {
  CREATE_ACCOUNT,
  getOptimisticResponseForAccountCreation,
  updateCacheAfterCreatingAccount,
  UPDATE_ACCOUNT,
} from "@web/generated/graphql/mutations/account.mutations";
import {
  accountCreationInputSchema,
  accountUpdateInputSchema,
} from "@web/generated/graphql/schemas/account.schemas";
import {
  AccountData,
  accountReducer,
  accountsReducer,
  initializeAccountData,
} from "@web/generated/reducers/account.reducer";
import { useHandleMutation } from "@web/utils/data/mutation";
import { ArrayAction, Payload } from "@web/utils/data/reduction";
import { Dispatch, useEffect, useReducer } from "react";

type AccountCreationMutationHookOptions = MutationHookOptions<
  { createAccount: AccountFragment },
  AccountCreationArgs
>;

export const useCreateAccount = (options?: AccountCreationMutationHookOptions) => {
  return useHandleMutation<{ createAccount: AccountFragment }, AccountCreationArgs>(
    CREATE_ACCOUNT,
    { ...updateCacheAfterCreatingAccount, ...(options ?? {}) },
    accountCreationInputSchema,
    getOptimisticResponseForAccountCreation
  );
};

type AccountUpdateMutationHookOptions = MutationHookOptions<
  { updateAccount: AccountFragment },
  AccountUpdateArgs
>;

export const useUpdateAccount = (options?: AccountUpdateMutationHookOptions) => {
  return useHandleMutation<{ updateAccount: AccountFragment }, AccountUpdateArgs>(
    UPDATE_ACCOUNT,
    { refetchQueries: ["GetUser"], ...(options ?? {}) },
    accountUpdateInputSchema
  );
};

export const useAccountReducer = (
  data?: AccountData
): [AccountData, Dispatch<Payload<AccountData>>] => {
  const { user } = useUser();
  const [accountData, dispatchAccountData] = useReducer(
    accountReducer,
    data ?? {},
    initializeAccountData
  );
  useEffect(() => {
    if (!user) return;
    if (!accountData?.userId) {
      dispatchAccountData({
        field: "init",
        value: initializeAccountData(accountData, user),
      });
    }
  }, [user, accountData]);
  return [accountData, dispatchAccountData];
};

export const useAccountsReducer = (
  data: AccountFragment[]
): [AccountFragment[], Dispatch<ArrayAction<AccountFragment>>] => {
  return useReducer(accountsReducer, data);
};
