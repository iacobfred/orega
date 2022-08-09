/* Do not edit this file. It was generated programmatically. */

import { ShelvingCreationArgs } from "@/graphql/schema/generated/args/shelving.args";
import {
  shelvingFragment,
  ShelvingFragment,
} from "@/graphql/schema/generated/fragments/shelving.fragment";
import {
  ShelvingCreationInput,
  ShelvingUpdateInput,
} from "@/graphql/schema/generated/inputs/shelving.inputs";
import { gql, MutationHookOptions } from "@apollo/client";

export const CREATE_SHELVING = gql`
  mutation CreateShelving($data: ShelvingCreationInput!) {
    createShelving(data: $data) {
      ...ShelvingFragment
    }
  }
  ${shelvingFragment}
`;

export const getOptimisticResponseForShelvingCreation = (
  data: ShelvingCreationInput
): { createShelving: ShelvingFragment } => {
  const now = new Date();
  return {
    createShelving: {
      __typename: "Shelving",
      id: "tmp-id",
      rationale: null,
      archivedAt: null,
      ...data,
      createdAt: now,
      updatedAt: now,
    },
  };
};

export const updateCacheAfterCreatingShelving: MutationHookOptions<
  { createShelving: ShelvingFragment },
  ShelvingCreationArgs
> = {
  update(cache, { data }) {
    const { createShelving } = data || {};
    if (createShelving) {
      const newShelvingRef = cache.writeFragment({
        data: createShelving,
        fragment: gql`
          fragment NewShelving on Shelving {
            ...ShelvingFragment
          }
          ${shelvingFragment}
        `,
        fragmentName: "NewShelving",
      });
      cache.modify({
        fields: {
          shelvings(existingShelvings = []) {
            return [...existingShelvings, newShelvingRef];
          },
        },
      });
    }
  },
};

export const UPDATE_SHELVING = gql`
  mutation UpdateShelving($where: ShelvingWhereUniqueInput!, $data: ShelvingUpdateInput!) {
    updateShelving(where: $where, data: $data) {
      ...ShelvingFragment
    }
  }
  ${shelvingFragment}
`;

export const getOptimisticResponseForShelvingUpdate = (
  fragment: ShelvingFragment,
  data: ShelvingUpdateInput
) => {
  const now = new Date();
  return {
    updateShelving: {
      __typename: "Shelving",
      ...fragment,
      ...data,
      updatedAt: now,
    },
  };
};

export const UPSERT_SHELVING = gql`
  mutation UpdateShelving($where: ShelvingWhereUniqueInput!, $data: ShelvingCreationInput!) {
    upsertShelving(where: $where, data: $data) {
      ...ShelvingFragment
    }
  }
  ${shelvingFragment}
`;

export const UPDATE_SHELVINGS = gql`
  mutation UpdateShelvings($where: ShelvingWhereInput!, $data: ShelvingUpdateInput!) {
    updateShelvings(where: $where, data: $data) {
      ...ShelvingFragment
    }
  }
  ${shelvingFragment}
`;

export const UPDATE_SHELVINGS_DISTINCTLY = gql`
  mutation UpdateShelvingsDistinctly($data: [ShelvingUpdateInput!]!) {
    updateShelvingsDistinctly(data: $data) {
      ...ShelvingFragment
    }
  }
  ${shelvingFragment}
`;
