import { WhereInput, WhereUniqueInput } from "@/graphql/schema/types";
import { ObjectId } from "mongodb";

type ModifiedFilter<T extends WhereUniqueInput> = Omit<T, "id"> & { _id?: ObjectId };

export function convertFilterForMongo(filter: undefined): undefined;
export function convertFilterForMongo<T extends WhereInput>(filter: T | undefined): T | undefined;
export function convertFilterForMongo<T extends WhereUniqueInput>(filter: T): ModifiedFilter<T>;
export function convertFilterForMongo<T extends WhereUniqueInput>(
  filter: T | undefined
): T | ModifiedFilter<T> | undefined {
  if (filter === undefined) return undefined;
  let modifiedFilter = Object.fromEntries(
    Object.entries(filter).filter(([, value]) => {
      return value !== undefined;
    })
  );
  if (modifiedFilter.id) modifiedFilter = { _id: modifiedFilter.id };
  console.log("Modified filter:", modifiedFilter);
  return modifiedFilter as ModifiedFilter<T>;
}
