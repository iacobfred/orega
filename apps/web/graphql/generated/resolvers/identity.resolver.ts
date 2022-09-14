/* Do not edit this file. It was generated programmatically. */

import * as TypeGraphQL from "type-graphql-v2-fork";
import Identity from "@web/generated/types/Identity";
import IdentityModel from "@web/generated/models/IdentityModel";
import {
  IdentityCreationArgs,
  IdentitiesCreationArgs,
  DeleteIdentityArgs,
  DeleteManyIdentityArgs,
  FindManyIdentityArgs,
  FindUniqueIdentityArgs,
  IdentityUpdateArgs,
  ArgsForUpdatingManyIdentities,
  IdentityUpsertionArgs,
} from "@web/graphql/generated/args/identity.args";
import type { GqlContext } from "@web/graphql/context";
import type { GraphQLResolveInfo } from "graphql";
import { convertFilterForMongo } from "@web/graphql/schema/helpers";
import { ObjectIdScalar } from "@web/graphql/schema/scalars";
import {
  createIdentity as _createIdentity,
  updateIdentity as _updateIdentity,
  upsertIdentity as _upsertIdentity,
  findIdentity as _findIdentity,
} from "@web/generated/shortcuts/identity.shortcuts";
import UserModel from "@web/generated/models/UserModel";

@TypeGraphQL.Resolver(() => Identity)
export class IdentityResolver {
  @TypeGraphQL.FieldResolver(() => ObjectIdScalar)
  id(@TypeGraphQL.Root() identity: Identity) {
    return identity._id;
  }

  @TypeGraphQL.Query(() => Identity, { nullable: true })
  async identity(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindUniqueIdentityArgs
  ): Promise<Identity | null> {
    return _findIdentity(args);
  }

  @TypeGraphQL.Query(() => [Identity], { nullable: false })
  async identities(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindManyIdentityArgs
  ): Promise<Identity[]> {
    const filter = convertFilterForMongo(args.where);
    return IdentityModel.find(filter ?? {});
  }

  @TypeGraphQL.Mutation(() => Identity)
  async createIdentity(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: IdentityCreationArgs
  ) {
    const identity = await _createIdentity(args);
    if (identity) {
      // NOTE: This update fails if it's not awaited.
      await UserModel.findOneAndUpdate(
        { _id: identity.userId },
        { $push: { identities: { ...identity } } }
      );
    }
    return identity;
  }

  @TypeGraphQL.Mutation(() => [Identity], { nullable: false })
  async createManyIdentity(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: IdentitiesCreationArgs
  ): Promise<Identity[]> {
    throw new Error("Not implemented");
  }

  @TypeGraphQL.Mutation(() => Identity)
  async updateIdentity(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: IdentityUpdateArgs
  ) {
    return _updateIdentity(args);
  }

  @TypeGraphQL.Mutation(() => Identity)
  async upsertIdentity(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: IdentityUpsertionArgs
  ) {
    return _upsertIdentity(args);
  }

  @TypeGraphQL.Mutation(() => [Identity], { nullable: false })
  async updateIdentities(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: ArgsForUpdatingManyIdentities
  ): Promise<Identity[]> {
    throw new Error("Not implemented");
  }

  @TypeGraphQL.Mutation(() => [Identity], { nullable: false })
  async updateIdentitiesDistinctly(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: ArgsForUpdatingManyIdentities
  ): Promise<Identity[]> {
    throw new Error("Not implemented");
  }

  @TypeGraphQL.Mutation(() => Identity, { nullable: true })
  async deleteIdentity(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: DeleteIdentityArgs
  ): Promise<Identity | null> {
    throw new Error("Not implemented");
  }

  @TypeGraphQL.Mutation(() => [Identity], { nullable: false })
  async deleteManyIdentity(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: DeleteManyIdentityArgs
  ): Promise<Identity[]> {
    throw new Error("Not implemented");
  }
}
