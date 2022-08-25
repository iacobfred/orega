/* Do not edit this file. It was generated programmatically. */

import Value from "@/graphql/generated/types/Value";
import { gql } from "@apollo/client";

export const valueFragment = gql`
  fragment ValueFragment on Value {
    __typename
    id
    userId
    name
    description
    createdAt
    updatedAt
    archivedAt
  }
`;

export type ValueFragment = Pick<
  Value,
  "__typename" | "id" | "createdAt" | "updatedAt" | "archivedAt" | "userId" | "name" | "description"
>;
