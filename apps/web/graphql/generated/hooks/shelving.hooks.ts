/* Do not edit this file. It was generated programmatically. */

import { MutationHookOptions } from "@apollo/client";
import {
  CREATE_SHELVING,
  UPDATE_SHELVING,
  updateCacheAfterCreatingShelving,
} from "@web/graphql/generated/mutations/shelving.mutations";
import { ShelvingFragment } from "@web/graphql/generated/fragments/shelving.fragment";
import {
  ShelvingCreationArgs,
  ShelvingUpdateArgs,
} from "@web/graphql/generated/args/shelving.args";
import { useHandleMutation } from "@web/utils/data/mutation";
import { Payload, ArrayAction } from "@web/utils/data/reduction";
import { useReducer, Dispatch } from "react";
import {
  shelvingReducer,
  shelvingsReducer,
  ShelvingData,
  initializeShelvingData,
} from "@web/graphql/generated/reducers/shelving.reducer";
import {
  shelvingCreationInputSchema,
  shelvingUpdateInputSchema,
} from "@web/graphql/generated/schemas/shelving.schemas";
import {
  getOptimisticResponseForShelvingCreation,
} from "@web/graphql/generated/mutations/shelving.mutations";

type ShelvingCreationMutationHookOptions = MutationHookOptions<
  { createShelving: ShelvingFragment },
  ShelvingCreationArgs
>;

export const useCreateShelving = (options?: ShelvingCreationMutationHookOptions) => {
  return useHandleMutation<{ createShelving: ShelvingFragment }, ShelvingCreationArgs>(
    CREATE_SHELVING,
    { ...updateCacheAfterCreatingShelving, ...(options ?? {}) },
    shelvingCreationInputSchema,
    getOptimisticResponseForShelvingCreation
  );
};

type ShelvingUpdateMutationHookOptions = MutationHookOptions<
  { updateShelving: ShelvingFragment },
  ShelvingUpdateArgs
>;

export const useUpdateShelving = (options?: ShelvingUpdateMutationHookOptions) => {
  return useHandleMutation<{ updateShelving: ShelvingFragment }, ShelvingUpdateArgs>(
    UPDATE_SHELVING,
    options,
    shelvingUpdateInputSchema
  );
};

export const useShelvingReducer = (
  data?: ShelvingData
): [ShelvingData, Dispatch<Payload<ShelvingData>>] => {
  const starterData = data ?? {};
  const initializedData = initializeShelvingData(starterData);
  const [shelvingData, dispatchShelvingData] = useReducer(
    shelvingReducer,
    initializedData,
    initializeShelvingData
  );
  return [shelvingData, dispatchShelvingData];
};

export const useShelvingsReducer = (
  data: ShelvingFragment[]
): [ShelvingFragment[], Dispatch<ArrayAction<ShelvingFragment>>] => {
  return useReducer(shelvingsReducer, data);
};
