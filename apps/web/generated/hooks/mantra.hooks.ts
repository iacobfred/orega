/* Do not edit this file. It was generated programmatically. */

import { MutationHookOptions } from "@apollo/client";
import { useUser } from "@web/components/contexts/UserContext";
import { MantraCreationArgs, MantraUpdateArgs } from "@web/generated/graphql/args/mantra.args";
import { MantraFragment } from "@web/generated/graphql/fragments/mantra.fragment";
import {
  CREATE_MANTRA,
  getOptimisticResponseForMantraCreation,
  updateCacheAfterCreatingMantra,
  UPDATE_MANTRA,
} from "@web/generated/graphql/mutations/mantra.mutations";
import {
  mantraCreationInputSchema,
  mantraUpdateInputSchema,
} from "@web/generated/graphql/schemas/mantra.schemas";
import {
  initializeMantraData,
  MantraData,
  mantraReducer,
  mantrasReducer,
} from "@web/generated/reducers/mantra.reducer";
import { useHandleMutation } from "@web/utils/data/mutation";
import { ArrayAction, Payload } from "@web/utils/data/reduction";
import { Dispatch, useEffect, useReducer } from "react";

type MantraCreationMutationHookOptions = MutationHookOptions<
  { createMantra: MantraFragment },
  MantraCreationArgs
>;

export const useCreateMantra = (options?: MantraCreationMutationHookOptions) => {
  return useHandleMutation<{ createMantra: MantraFragment }, MantraCreationArgs>(
    CREATE_MANTRA,
    { ...updateCacheAfterCreatingMantra, ...(options ?? {}) },
    mantraCreationInputSchema,
    getOptimisticResponseForMantraCreation
  );
};

type MantraUpdateMutationHookOptions = MutationHookOptions<
  { updateMantra: MantraFragment },
  MantraUpdateArgs
>;

export const useUpdateMantra = (options?: MantraUpdateMutationHookOptions) => {
  return useHandleMutation<{ updateMantra: MantraFragment }, MantraUpdateArgs>(
    UPDATE_MANTRA,
    { refetchQueries: ["GetUser"], ...(options ?? {}) },
    mantraUpdateInputSchema
  );
};

export const useMantraReducer = (
  data?: MantraData
): [MantraData, Dispatch<Payload<MantraData>>] => {
  const { user } = useUser();
  const [mantraData, dispatchMantraData] = useReducer(
    mantraReducer,
    data ?? {},
    initializeMantraData
  );
  useEffect(() => {
    if (!user) return;
    if (!mantraData?.userId) {
      dispatchMantraData({
        field: "init",
        value: initializeMantraData(mantraData, user),
      });
    }
  }, [user, mantraData]);
  return [mantraData, dispatchMantraData];
};

export const useMantrasReducer = (
  data: MantraFragment[]
): [MantraFragment[], Dispatch<ArrayAction<MantraFragment>>] => {
  return useReducer(mantrasReducer, data);
};
