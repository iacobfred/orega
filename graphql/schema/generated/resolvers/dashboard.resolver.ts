/* Do not edit this file. It was generated programmatically. */

import { GqlContext } from "@/graphql/context";
import {
  CreateDashboardArgs,
  CreateManyDashboardArgs,
  DeleteDashboardArgs,
  DeleteManyDashboardArgs,
  FindManyDashboardArgs,
  FindUniqueDashboardArgs,
  UpdateDashboardArgs,
  UpdateManyDashboardArgs,
  UpsertDashboardArgs,
} from "@/graphql/schema/generated/args/dashboard.args";
import DashboardModel, { Dashboard } from "@/graphql/schema/generated/models/dashboard.model";
import UserModel from "@/graphql/schema/generated/models/user.model";
import { convertFilterForMongo } from "@/graphql/schema/helpers";
import { ObjectIdScalar } from "@/graphql/schema/scalars";
import { GraphQLResolveInfo } from "graphql";
import * as TypeGraphQL from "type-graphql-v2-fork";

@TypeGraphQL.Resolver(() => Dashboard)
export class DashboardResolver {
  @TypeGraphQL.FieldResolver(() => ObjectIdScalar)
  id(@TypeGraphQL.Root() dashboard: Dashboard) {
    return dashboard._id;
  }

  @TypeGraphQL.Query(() => Dashboard, { nullable: true })
  async dashboard(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindUniqueDashboardArgs
  ): Promise<Dashboard | null> {
    const filter = convertFilterForMongo(args.where);
    return DashboardModel.findOne(filter);
  }

  @TypeGraphQL.Query(() => [Dashboard], { nullable: false })
  async dashboards(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindManyDashboardArgs
  ): Promise<Dashboard[]> {
    const filter = convertFilterForMongo(args.where);
    return DashboardModel.find(filter ?? {});
  }

  @TypeGraphQL.Mutation(() => Dashboard)
  async createDashboard(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: CreateDashboardArgs
  ) {
    const dashboard = await DashboardModel.create(args.data);
    if (dashboard) {
      // NOTE: This update fails if it's not awaited.
      await UserModel.findOneAndUpdate(
        { _id: dashboard.userId },
        { $push: { dashboards: { ...dashboard } } }
      );
    }
    return dashboard;
  }

  @TypeGraphQL.Mutation(() => [Dashboard], { nullable: false })
  async createManyDashboard(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: CreateManyDashboardArgs
  ): Promise<Dashboard[]> {
    throw new Error("Not implemented");
  }

  @TypeGraphQL.Mutation(() => Dashboard)
  async updateDashboard(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: UpdateDashboardArgs
  ) {
    const filter = convertFilterForMongo(args.where);
    const dashboard = await DashboardModel.findOneAndUpdate(filter, args.data, {
      returnDocument: "after",
    });
    dashboard &&
      UserModel.findOneAndUpdate(
        { _id: dashboard.userId, "dashboards._id": dashboard._id },
        {
          $set: { "dashboards.$": { ...dashboard } },
        }
      );
    return dashboard;
  }

  @TypeGraphQL.Mutation(() => Dashboard)
  async upsertDashboard(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: UpsertDashboardArgs
  ) {
    const filter = convertFilterForMongo(args.where);
    const dashboard = await DashboardModel.findOneAndUpdate(filter, args.data, {
      upsert: true,
      new: true,
      returnDocument: "after",
    });
    return dashboard;
  }

  @TypeGraphQL.Mutation(() => [Dashboard], { nullable: false })
  async updateManyDashboard(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: UpdateManyDashboardArgs
  ): Promise<Dashboard[]> {
    throw new Error("Not implemented");
  }

  @TypeGraphQL.Mutation(() => Dashboard, { nullable: true })
  async deleteDashboard(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: DeleteDashboardArgs
  ): Promise<Dashboard | null> {
    throw new Error("Not implemented");
  }

  @TypeGraphQL.Mutation(() => [Dashboard], { nullable: false })
  async deleteManyDashboard(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: DeleteManyDashboardArgs
  ): Promise<Dashboard[]> {
    throw new Error("Not implemented");
  }
}
