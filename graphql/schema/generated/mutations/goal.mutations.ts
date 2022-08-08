/* Do not edit this file. It was generated programmatically. */

import { CreateGoalArgs } from "@/graphql/schema/generated/args/goal.args";
import { goalFragment, GoalFragment } from "@/graphql/schema/generated/fragments/goal.fragment";
import { GoalCreateInput, GoalUpdateInput } from "@/graphql/schema/generated/inputs/goal.inputs";
import { gql, MutationHookOptions } from "@apollo/client";

export const CREATE_GOAL = gql`
  mutation CreateGoal($data: GoalCreateInput!) {
    createGoal(data: $data) {
      ...GoalFragment
    }
  }
  ${goalFragment}
`;

export const getOptimisticResponseForGoalCreation = (data: GoalCreateInput) => {
  const now = new Date();
  return {
    createGoal: {
      __typename: "Goal",
      id: "tmp-id",
      habitId: null,
      parentId: null,
      archivedAt: null,
      ...data,
      createdAt: now,
      updatedAt: now,
    },
  };
};

export const updateCacheAfterCreatingGoal: MutationHookOptions<
  { createGoal: GoalFragment },
  CreateGoalArgs
> = {
  update(cache, { data }) {
    const { createGoal } = data || {};
    if (createGoal) {
      const newGoalRef = cache.writeFragment({
        data: createGoal,
        fragment: gql`
          fragment NewGoal on Goal {
            ...GoalFragment
          }
          ${goalFragment}
        `,
        fragmentName: "NewGoal",
      });
      cache.modify({
        fields: {
          goals(existingGoals = []) {
            return [...existingGoals, newGoalRef];
          },
        },
      });
    }
  },
};

export const UPDATE_GOAL = gql`
  mutation UpdateGoal($where: GoalWhereUniqueInput!, $data: GoalUpdateInput!) {
    updateGoal(where: $where, data: $data) {
      ...GoalFragment
    }
  }
  ${goalFragment}
`;

export const getOptimisticResponseForGoalUpdate = (
  fragment: GoalFragment,
  data: GoalUpdateInput
) => {
  const now = new Date();
  return {
    updateGoal: {
      __typename: "Goal",
      ...fragment,
      ...data,
      updatedAt: now,
    },
  };
};

export const UPSERT_GOAL = gql`
  mutation UpdateGoal($where: GoalWhereUniqueInput!, $data: GoalCreateInput!) {
    upsertGoal(where: $where, data: $data) {
      ...GoalFragment
    }
  }
  ${goalFragment}
`;
