/* Do not edit this file. It was generated programmatically. */

import * as TypeGraphQL from "type-graphql-v2-fork";
import Mantra from "@web/graphql/generated/types/Mantra";
import MantraModel from "@web/graphql/generated/models/MantraModel";
import {
  MantraCreationArgs,
  MantrasCreationArgs,
  DeleteMantraArgs,
  DeleteManyMantraArgs,
  FindManyMantraArgs,
  FindUniqueMantraArgs,
  MantraUpdateArgs,
  ArgsForUpdatingManyMantras,
  MantraUpsertionArgs,
} from "@web/graphql/generated/args/mantra.args";
import type { GqlContext } from "@web/graphql/context";
import type { GraphQLResolveInfo } from "graphql";
import { convertFilterForMongo } from "@web/graphql/schema/helpers";
import { ObjectIdScalar } from "@web/graphql/schema/scalars";
import {
  createMantra as _createMantra,
  upsertMantra as _upsertMantra,
} from "@web/graphql/generated/shortcuts/mantra.shortcuts";
import UserModel from "@web/graphql/generated/models/UserModel";

@TypeGraphQL.Resolver(() => Mantra)
export class MantraResolver {
  @TypeGraphQL.FieldResolver(() => ObjectIdScalar)
  id(@TypeGraphQL.Root() mantra: Mantra) {
    return mantra._id;
  }

  @TypeGraphQL.Query(() => Mantra, { nullable: true })
  async mantra(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindUniqueMantraArgs
  ): Promise<Mantra | null> {
    const filter = convertFilterForMongo(args.where);
    return MantraModel.findOne(filter);
  }

  @TypeGraphQL.Query(() => [Mantra], { nullable: false })
  async mantras(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindManyMantraArgs
  ): Promise<Mantra[]> {
    const filter = convertFilterForMongo(args.where);
    return MantraModel.find(filter ?? {});
  }

  @TypeGraphQL.Mutation(() => Mantra)
  async createMantra(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: MantraCreationArgs
  ) {
    const mantra = await _createMantra(args);
    if (mantra) {
      // NOTE: This update fails if it's not awaited.
      await UserModel.findOneAndUpdate(
        { _id: mantra.userId },
        { $push: { mantras: { ...mantra } } }
      );
    }
    return mantra;
  }

  @TypeGraphQL.Mutation(() => [Mantra], { nullable: false })
  async createManyMantra(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: MantrasCreationArgs
  ): Promise<Mantra[]> {
    throw new Error("Not implemented");
  }

  @TypeGraphQL.Mutation(() => Mantra)
  async updateMantra(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: MantraUpdateArgs
  ) {
    const filter = convertFilterForMongo(args.where);
    const mantra = await MantraModel.findOneAndUpdate(filter, args.data, {
      returnDocument: "after",
    });
    // NOTE: This update fails if it's not awaited.
    mantra &&
      (await UserModel.findOneAndUpdate(
        { _id: mantra.userId, "mantras._id": mantra._id },
        {
          $set: { "mantras.$": { ...mantra } },
        }
      ));
    return mantra;
  }

  @TypeGraphQL.Mutation(() => Mantra)
  async upsertMantra(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: MantraUpsertionArgs
  ) {
    return _upsertMantra(args);
  }

  @TypeGraphQL.Mutation(() => [Mantra], { nullable: false })
  async updateMantras(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: ArgsForUpdatingManyMantras
  ): Promise<Mantra[]> {
    throw new Error("Not implemented");
  }

  @TypeGraphQL.Mutation(() => [Mantra], { nullable: false })
  async updateMantrasDistinctly(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: ArgsForUpdatingManyMantras
  ): Promise<Mantra[]> {
    throw new Error("Not implemented");
  }

  @TypeGraphQL.Mutation(() => Mantra, { nullable: true })
  async deleteMantra(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: DeleteMantraArgs
  ): Promise<Mantra | null> {
    throw new Error("Not implemented");
  }

  @TypeGraphQL.Mutation(() => [Mantra], { nullable: false })
  async deleteManyMantra(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: DeleteManyMantraArgs
  ): Promise<Mantra[]> {
    throw new Error("Not implemented");
  }
}
