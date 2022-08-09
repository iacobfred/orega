/* Do not edit this file. It was generated programmatically. */

import { GqlContext } from "@/graphql/context";
import {
  ArgsForUpdatingManyBooks,
  BookCreationArgs,
  BooksCreationArgs,
  BookUpdateArgs,
  BookUpsertionArgs,
  DeleteBookArgs,
  DeleteManyBookArgs,
  FindManyBookArgs,
  FindUniqueBookArgs,
} from "@/graphql/schema/generated/args/book.args";
import BookModel, { Book } from "@/graphql/schema/generated/models/book.model";
import { convertFilterForMongo } from "@/graphql/schema/helpers";
import { ObjectIdScalar } from "@/graphql/schema/scalars";
import { GraphQLResolveInfo } from "graphql";
import * as TypeGraphQL from "type-graphql-v2-fork";

@TypeGraphQL.Resolver(() => Book)
export class BookResolver {
  @TypeGraphQL.FieldResolver(() => ObjectIdScalar)
  id(@TypeGraphQL.Root() book: Book) {
    return book._id;
  }

  @TypeGraphQL.Query(() => Book, { nullable: true })
  async book(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindUniqueBookArgs
  ): Promise<Book | null> {
    const filter = convertFilterForMongo(args.where);
    return BookModel.findOne(filter);
  }

  @TypeGraphQL.Query(() => [Book], { nullable: false })
  async books(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindManyBookArgs
  ): Promise<Book[]> {
    const filter = convertFilterForMongo(args.where);
    return BookModel.find(filter ?? {});
  }

  @TypeGraphQL.Mutation(() => Book)
  async createBook(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: BookCreationArgs
  ) {
    const book = await BookModel.create(args.data);
    return book;
  }

  @TypeGraphQL.Mutation(() => [Book], { nullable: false })
  async createManyBook(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: BooksCreationArgs
  ): Promise<Book[]> {
    throw new Error("Not implemented");
  }

  @TypeGraphQL.Mutation(() => Book)
  async updateBook(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: BookUpdateArgs
  ) {
    const filter = convertFilterForMongo(args.where);
    const book = await BookModel.findOneAndUpdate(filter, args.data, { returnDocument: "after" });
    return book;
  }

  @TypeGraphQL.Mutation(() => Book)
  async upsertBook(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: BookUpsertionArgs
  ) {
    const filter = convertFilterForMongo(args.where);
    const book = await BookModel.findOneAndUpdate(filter, args.data, {
      upsert: true,
      new: true,
      returnDocument: "after",
    });
    return book;
  }

  @TypeGraphQL.Mutation(() => [Book], { nullable: false })
  async updateBooks(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: ArgsForUpdatingManyBooks
  ): Promise<Book[]> {
    throw new Error("Not implemented");
  }

  @TypeGraphQL.Mutation(() => [Book], { nullable: false })
  async updateBooksDistinctly(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: ArgsForUpdatingManyBooks
  ): Promise<Book[]> {
    throw new Error("Not implemented");
  }

  @TypeGraphQL.Mutation(() => Book, { nullable: true })
  async deleteBook(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: DeleteBookArgs
  ): Promise<Book | null> {
    throw new Error("Not implemented");
  }

  @TypeGraphQL.Mutation(() => [Book], { nullable: false })
  async deleteManyBook(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: DeleteManyBookArgs
  ): Promise<Book[]> {
    throw new Error("Not implemented");
  }
}
