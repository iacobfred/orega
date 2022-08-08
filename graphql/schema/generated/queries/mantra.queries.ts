/* Do not edit this file. It was generated programmatically. */

import { mantraFragment } from "@/graphql/schema/generated/fragments/mantra.fragment";
import { gql } from "@apollo/client";

export const GET_MANTRA = gql`
  query GetMantra($where: MantraWhereUniqueInput!) {
    mantra(where: $where) {
      ...MantraFragment
    }
  }
  ${mantraFragment}
`;

export const GET_MANTRAS = gql`
  query GetMantras {
    mantras {
      ...MantraFragment
    }
  }
  ${mantraFragment}
`;
