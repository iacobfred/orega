/* Do not edit this file. It was generated programmatically. */

import { GqlContext } from "@/graphql/context";
import {
  CreateManyValueArgs,
  CreateValueArgs,
  DeleteManyValueArgs,
  DeleteValueArgs,
  FindManyValueArgs,
  FindUniqueValueArgs,
  UpdateManyValueArgs,
  UpdateValueArgs,
  UpsertValueArgs,
} from "@/graphql/schema/generated/args/value.args";
import UserModel from "@/graphql/schema/generated/models/user.model";
import ValueModel, { Value } from "@/graphql/schema/generated/models/value.model";
import { convertFilterForMongo } from "@/graphql/schema/helpers";
import { ObjectIdScalar } from "@/graphql/schema/scalars";
import { GraphQLResolveInfo } from "graphql";
import * as TypeGraphQL from "type-graphql-v2-fork";

@TypeGraphQL.Resolver(() => Value)
export class ValueResolver {
  @TypeGraphQL.FieldResolver(() => ObjectIdScalar)
  id(@TypeGraphQL.Root() value: Value) {
    return value._id;
  }

  @TypeGraphQL.Query(() => Value, { nullable: true })
  async value(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindUniqueValueArgs
  ): Promise<Value | null> {
    const filter = convertFilterForMongo(args.where);
    return ValueModel.findOne(filter);
  }

  @TypeGraphQL.Query(() => [Value], { nullable: false })
  async values(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindManyValueArgs
  ): Promise<Value[]> {
    const filter = convertFilterForMongo(args.where);
    return ValueModel.find(filter ?? {});
  }

  @TypeGraphQL.Mutation(() => Value)
  async createValue(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: CreateValueArgs
  ) {
    const value = await ValueModel.create(args.data);
    if (value) {
      // NOTE: This update fails if it's not awaited.
      await UserModel.findOneAndUpdate({ _id: value.userId }, { $push: { values: { ...value } } });
    }
    return value;
  }

  @TypeGraphQL.Mutation(() => [Value], { nullable: false })
  async createManyValue(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: CreateManyValueArgs
  ): Promise<Value[]> {
    throw new Error("Not implemented");
  }

  @TypeGraphQL.Mutation(() => Value)
  async updateValue(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: UpdateValueArgs
  ) {
    const filter = convertFilterForMongo(args.where);
    const value = await ValueModel.findOneAndUpdate(filter, args.data, { returnDocument: "after" });
    value &&
      UserModel.findOneAndUpdate(
        { _id: value.userId, "values._id": value._id },
        {
          $set: { "values.$": { ...value } },
        }
      );
    return value;
  }

  @TypeGraphQL.Mutation(() => Value)
  async upsertValue(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: UpsertValueArgs
  ) {
    const filter = convertFilterForMongo(args.where);
    const value = await ValueModel.findOneAndUpdate(filter, args.data, {
      upsert: true,
      new: true,
      returnDocument: "after",
    });
    return value;
  }

  @TypeGraphQL.Mutation(() => [Value], { nullable: false })
  async updateManyValue(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: UpdateManyValueArgs
  ): Promise<Value[]> {
    throw new Error("Not implemented");
  }

  @TypeGraphQL.Mutation(() => Value, { nullable: true })
  async deleteValue(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: DeleteValueArgs
  ): Promise<Value | null> {
    throw new Error("Not implemented");
  }

  @TypeGraphQL.Mutation(() => [Value], { nullable: false })
  async deleteManyValue(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: DeleteManyValueArgs
  ): Promise<Value[]> {
    throw new Error("Not implemented");
  }
}
