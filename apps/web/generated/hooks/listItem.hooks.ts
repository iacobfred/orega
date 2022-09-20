/* Do not edit this file. It was generated programmatically. */

import { MutationHookOptions } from "@apollo/client";
import { useUser } from "@web/components/contexts/UserContext";
import {
  ListItemCreationArgs,
  ListItemUpdateArgs,
} from "@web/generated/graphql/args/listItem.args";
import { ListItemFragment } from "@web/generated/graphql/fragments/listItem.fragment";
import {
  CREATE_LIST_ITEM,
  getOptimisticResponseForListItemCreation,
  updateCacheAfterCreatingListItem,
  UPDATE_LIST_ITEM,
} from "@web/generated/graphql/mutations/listItem.mutations";
import {
  listItemCreationInputSchema,
  listItemUpdateInputSchema,
} from "@web/generated/graphql/schemas/listItem.schemas";
import {
  initializeListItemData,
  ListItemData,
  listItemReducer,
  listItemsReducer,
} from "@web/generated/reducers/listItem.reducer";
import { useHandleMutation } from "@web/hooks/mutation";
import { ArrayAction, Payload } from "@web/hooks/reduction";
import { Dispatch, useEffect, useReducer } from "react";

type ListItemCreationMutationHookOptions = MutationHookOptions<
  { createListItem: ListItemFragment },
  ListItemCreationArgs
>;

export const useCreateListItem = (options?: ListItemCreationMutationHookOptions) => {
  return useHandleMutation<{ createListItem: ListItemFragment }, ListItemCreationArgs>(
    CREATE_LIST_ITEM,
    { ...updateCacheAfterCreatingListItem, ...(options ?? {}) },
    listItemCreationInputSchema,
    getOptimisticResponseForListItemCreation
  );
};

type ListItemUpdateMutationHookOptions = MutationHookOptions<
  { updateListItem: ListItemFragment },
  ListItemUpdateArgs
>;

export const useUpdateListItem = (options?: ListItemUpdateMutationHookOptions) => {
  return useHandleMutation<{ updateListItem: ListItemFragment }, ListItemUpdateArgs>(
    UPDATE_LIST_ITEM,
    { refetchQueries: ["GetUser"], ...(options ?? {}) },
    listItemUpdateInputSchema
  );
};

export const useListItemReducer = (
  data?: ListItemData
): [ListItemData, Dispatch<Payload<ListItemData>>] => {
  const { user } = useUser();
  const [listItemData, dispatchListItemData] = useReducer(
    listItemReducer,
    data ?? {},
    initializeListItemData
  );
  useEffect(() => {
    if (!user) return;
    if (!listItemData?.userId) {
      dispatchListItemData({
        field: "init",
        value: initializeListItemData(listItemData, user),
      });
    }
  }, [user, listItemData]);
  return [listItemData, dispatchListItemData];
};

export const useListItemsReducer = (
  data: ListItemFragment[]
): [ListItemFragment[], Dispatch<ArrayAction<ListItemFragment>>] => {
  return useReducer(listItemsReducer, data);
};
