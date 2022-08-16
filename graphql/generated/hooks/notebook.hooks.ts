/* Do not edit this file. It was generated programmatically. */

import { useUser } from "@/components/contexts/UserContext";
import { NotebookCreationArgs, NotebookUpdateArgs } from "@/graphql/generated/args/notebook.args";
import { NotebookFragment } from "@/graphql/generated/fragments/notebook.fragment";
import {
  CREATE_NOTEBOOK,
  updateCacheAfterCreatingNotebook,
  UPDATE_NOTEBOOK,
} from "@/graphql/generated/mutations/notebook.mutations";
import {
  initializeNotebookData,
  NotebookData,
  notebookDataReducer,
} from "@/graphql/generated/reducers/notebook.reducer";
import { Payload, useHandleMutation } from "@/utils/data";
import { MutationHookOptions } from "@apollo/client";
import { Dispatch, useEffect, useReducer } from "react";

type NotebookCreationMutationHookOptions = MutationHookOptions<
  { createNotebook: NotebookFragment },
  NotebookCreationArgs
>;

export const useCreateNotebook = (options?: NotebookCreationMutationHookOptions) => {
  return useHandleMutation<{ createNotebook: NotebookFragment }, NotebookCreationArgs>(
    CREATE_NOTEBOOK,
    {
      ...updateCacheAfterCreatingNotebook,
      ...(options ?? {}),
    }
  );
};

type NotebookUpdateMutationHookOptions = MutationHookOptions<
  { updateNotebook: NotebookFragment },
  NotebookUpdateArgs
>;

export const useUpdateNotebook = (options?: NotebookUpdateMutationHookOptions) => {
  return useHandleMutation<{ updateNotebook: NotebookFragment }, NotebookUpdateArgs>(
    UPDATE_NOTEBOOK,
    options
  );
};

export const useNotebookDataReducer = (
  data?: NotebookData
): [NotebookData, Dispatch<Payload<NotebookData>>] => {
  const user = useUser();
  const starterData = data ?? {};
  const initializedData = initializeNotebookData(starterData, user);
  const [notebookData, dispatchNotebookData] = useReducer(
    notebookDataReducer,
    initializedData,
    initializeNotebookData
  );
  useEffect(() => {
    if (user?.id && !notebookData?.userId) {
      dispatchNotebookData({
        field: "init",
        value: initializeNotebookData(notebookData, user),
      });
    }
  }, [user, notebookData]);
  return [notebookData, dispatchNotebookData];
};
