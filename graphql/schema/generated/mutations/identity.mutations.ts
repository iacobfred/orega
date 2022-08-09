/* Do not edit this file. It was generated programmatically. */

import { IdentityCreationArgs } from "@/graphql/schema/generated/args/identity.args";
import {
  identityFragment,
  IdentityFragment,
} from "@/graphql/schema/generated/fragments/identity.fragment";
import {
  IdentityCreationInput,
  IdentityUpdateInput,
} from "@/graphql/schema/generated/inputs/identity.inputs";
import { gql, MutationHookOptions } from "@apollo/client";

export const CREATE_IDENTITY = gql`
  mutation CreateIdentity($data: IdentityCreationInput!) {
    createIdentity(data: $data) {
      ...IdentityFragment
    }
  }
  ${identityFragment}
`;

export const getOptimisticResponseForIdentityCreation = (
  data: IdentityCreationInput
): { createIdentity: IdentityFragment } => {
  const now = new Date();
  return {
    createIdentity: {
      __typename: "Identity",
      id: "tmp-id",
      description: null,
      archivedAt: null,
      ...data,
      createdAt: now,
      updatedAt: now,
    },
  };
};

export const updateCacheAfterCreatingIdentity: MutationHookOptions<
  { createIdentity: IdentityFragment },
  IdentityCreationArgs
> = {
  update(cache, { data }) {
    const { createIdentity } = data || {};
    if (createIdentity) {
      const newIdentityRef = cache.writeFragment({
        data: createIdentity,
        fragment: gql`
          fragment NewIdentity on Identity {
            ...IdentityFragment
          }
          ${identityFragment}
        `,
        fragmentName: "NewIdentity",
      });
      cache.modify({
        id: `User:${createIdentity.userId}`,
        fields: {
          identitys(existingIdentityRefs = []) {
            return [...existingIdentityRefs, newIdentityRef];
          },
        },
      });
      cache.modify({
        fields: {
          identities(existingIdentities = []) {
            return [...existingIdentities, newIdentityRef];
          },
        },
      });
    }
  },
};

export const UPDATE_IDENTITY = gql`
  mutation UpdateIdentity($where: IdentityWhereUniqueInput!, $data: IdentityUpdateInput!) {
    updateIdentity(where: $where, data: $data) {
      ...IdentityFragment
    }
  }
  ${identityFragment}
`;

export const getOptimisticResponseForIdentityUpdate = (
  fragment: IdentityFragment,
  data: IdentityUpdateInput
) => {
  const now = new Date();
  return {
    updateIdentity: {
      __typename: "Identity",
      ...fragment,
      ...data,
      updatedAt: now,
    },
  };
};

export const UPSERT_IDENTITY = gql`
  mutation UpdateIdentity($where: IdentityWhereUniqueInput!, $data: IdentityCreationInput!) {
    upsertIdentity(where: $where, data: $data) {
      ...IdentityFragment
    }
  }
  ${identityFragment}
`;

export const UPDATE_IDENTITIES = gql`
  mutation UpdateIdentities($where: IdentityWhereInput!, $data: IdentityUpdateInput!) {
    updateIdentities(where: $where, data: $data) {
      ...IdentityFragment
    }
  }
  ${identityFragment}
`;

export const UPDATE_IDENTITIES_DISTINCTLY = gql`
  mutation UpdateIdentitiesDistinctly($data: [IdentityUpdateInput!]!) {
    updateIdentitiesDistinctly(data: $data) {
      ...IdentityFragment
    }
  }
  ${identityFragment}
`;
