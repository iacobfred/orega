/* Do not edit this file. It was generated programmatically. */

import { CreateBookArgs } from "@/graphql/schema/generated/args/book.args";
import { bookFragment, BookFragment } from "@/graphql/schema/generated/fragments/book.fragment";
import { BookCreateInput, BookUpdateInput } from "@/graphql/schema/generated/inputs/book.inputs";
import { gql, MutationHookOptions } from "@apollo/client";

export const CREATE_BOOK = gql`
  mutation CreateBook($data: BookCreateInput!) {
    createBook(data: $data) {
      ...BookFragment
    }
  }
  ${bookFragment}
`;

export const getOptimisticResponseForBookCreation = (data: BookCreateInput) => {
  const now = new Date();
  return {
    createBook: {
      __typename: "Book",
      id: "tmp-id",
      isbn: null,
      isbn13: null,
      description: null,
      publicationYear: null,
      originalPublicationYear: null,
      archivedAt: null,
      ...data,
      createdAt: now,
      updatedAt: now,
    },
  };
};

export const updateCacheAfterCreatingBook: MutationHookOptions<
  { createBook: BookFragment },
  CreateBookArgs
> = {
  update(cache, { data }) {
    const { createBook } = data || {};
    if (createBook) {
      const newBookRef = cache.writeFragment({
        data: createBook,
        fragment: gql`
          fragment NewBook on Book {
            ...BookFragment
          }
          ${bookFragment}
        `,
        fragmentName: "NewBook",
      });
      cache.modify({
        fields: {
          books(existingBooks = []) {
            return [...existingBooks, newBookRef];
          },
        },
      });
    }
  },
};

export const UPDATE_BOOK = gql`
  mutation UpdateBook($where: BookWhereUniqueInput!, $data: BookUpdateInput!) {
    updateBook(where: $where, data: $data) {
      ...BookFragment
    }
  }
  ${bookFragment}
`;

export const getOptimisticResponseForBookUpdate = (
  fragment: BookFragment,
  data: BookUpdateInput
) => {
  const now = new Date();
  return {
    updateBook: {
      __typename: "Book",
      ...fragment,
      ...data,
      updatedAt: now,
    },
  };
};

export const UPSERT_BOOK = gql`
  mutation UpdateBook($where: BookWhereUniqueInput!, $data: BookCreateInput!) {
    upsertBook(where: $where, data: $data) {
      ...BookFragment
    }
  }
  ${bookFragment}
`;
