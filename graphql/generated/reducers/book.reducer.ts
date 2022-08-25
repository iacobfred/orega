/* Do not edit this file. It was generated programmatically. */
// import Book from "@/graphql/generated/types/Book";
import { UserFragment } from "@/graphql/generated/fragments/user.fragment";
import { BookCreationInput } from "@/graphql/generated/inputs/book.inputs";
import { ID } from "@/graphql/schema/types";
import { Payload } from "@/utils/data";

export type BookData = Partial<BookCreationInput> & { id?: ID };
// export type BookData = InputData<Book>;
// export type InitialBookData = InitialData<Book, "rank" | "userId">;

export function initializeBookData(
  data: Partial<BookData>,
  user?: UserFragment | null | undefined
): Partial<BookData> {
  return {
    title: "",
    slug: "",
    authorNames: [],
    authorNamesLf: [],
    ...Object.fromEntries(Object.entries(data).filter(([, value]) => value !== undefined)), // TODO: make this unnecessary
  };
}

export function bookDataReducer(state: BookData, payload: Payload<BookData>) {
  if (payload.field === "init") return initializeBookData(payload.value as Partial<BookData>);
  return { ...state, [payload.field]: payload.value };
}
