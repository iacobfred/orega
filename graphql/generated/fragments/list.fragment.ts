/* Do not edit this file. It was generated programmatically. */

import List from "@/graphql/generated/types/List";
import { gql } from "@apollo/client";

export const listFragment = gql`
  fragment ListFragment on List {
    __typename
    id
    userId
    name
    description
    fields
    createdAt
    updatedAt
    archivedAt
  }
`;

export type ListFragment = Pick<
  List,
  | "__typename"
  | "id"
  | "createdAt"
  | "updatedAt"
  | "archivedAt"
  | "userId"
  | "name"
  | "description"
  | "fields"
>;
