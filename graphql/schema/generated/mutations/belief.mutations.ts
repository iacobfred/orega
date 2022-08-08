/* Do not edit this file. It was generated programmatically. */

import { CreateBeliefArgs } from "@/graphql/schema/generated/args/belief.args";
import {
  beliefFragment,
  BeliefFragment,
} from "@/graphql/schema/generated/fragments/belief.fragment";
import {
  BeliefCreateInput,
  BeliefUpdateInput,
} from "@/graphql/schema/generated/inputs/belief.inputs";
import { gql, MutationHookOptions } from "@apollo/client";

export const CREATE_BELIEF = gql`
  mutation CreateBelief($data: BeliefCreateInput!) {
    createBelief(data: $data) {
      ...BeliefFragment
    }
  }
  ${beliefFragment}
`;

export const getOptimisticResponseForBeliefCreation = (data: BeliefCreateInput) => {
  const now = new Date();
  return {
    createBelief: {
      __typename: "Belief",
      id: "tmp-id",
      description: null,
      archivedAt: null,
      ...data,
      createdAt: now,
      updatedAt: now,
    },
  };
};

export const updateCacheAfterCreatingBelief: MutationHookOptions<
  { createBelief: BeliefFragment },
  CreateBeliefArgs
> = {
  update(cache, { data }) {
    const { createBelief } = data || {};
    if (createBelief) {
      const newBeliefRef = cache.writeFragment({
        data: createBelief,
        fragment: gql`
          fragment NewBelief on Belief {
            ...BeliefFragment
          }
          ${beliefFragment}
        `,
        fragmentName: "NewBelief",
      });
      cache.modify({
        id: `User:${createBelief.userId}`,
        fields: {
          beliefs(existingBeliefRefs = []) {
            return [...existingBeliefRefs, newBeliefRef];
          },
        },
      });
      cache.modify({
        fields: {
          beliefs(existingBeliefs = []) {
            return [...existingBeliefs, newBeliefRef];
          },
        },
      });
    }
  },
};

export const UPDATE_BELIEF = gql`
  mutation UpdateBelief($where: BeliefWhereUniqueInput!, $data: BeliefUpdateInput!) {
    updateBelief(where: $where, data: $data) {
      ...BeliefFragment
    }
  }
  ${beliefFragment}
`;

export const getOptimisticResponseForBeliefUpdate = (
  fragment: BeliefFragment,
  data: BeliefUpdateInput
) => {
  const now = new Date();
  return {
    updateBelief: {
      __typename: "Belief",
      ...fragment,
      ...data,
      updatedAt: now,
    },
  };
};

export const UPSERT_BELIEF = gql`
  mutation UpdateBelief($where: BeliefWhereUniqueInput!, $data: BeliefCreateInput!) {
    upsertBelief(where: $where, data: $data) {
      ...BeliefFragment
    }
  }
  ${beliefFragment}
`;
