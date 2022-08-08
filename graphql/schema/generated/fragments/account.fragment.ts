/* Do not edit this file. It was generated programmatically. */

import { Account } from "@/graphql/schema/generated/models/account.model";
import { gql } from "@apollo/client";

export const accountFragment = gql`
  fragment AccountFragment on Account {
    __typename
    id
    userId
    provider
    remoteId
    scopes
    accessToken
    refreshToken
    accessTokenExpiry
    syncToken
    createdAt
    updatedAt
    archivedAt
  }
`;

export type AccountFragment = Pick<
  Account,
  | "__typename"
  | "id"
  | "createdAt"
  | "updatedAt"
  | "archivedAt"
  | "userId"
  | "provider"
  | "remoteId"
  | "scopes"
  | "accessToken"
  | "refreshToken"
  | "accessTokenExpiry"
  | "syncToken"
>;
