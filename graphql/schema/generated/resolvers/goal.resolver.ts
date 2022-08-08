/* Do not edit this file. It was generated programmatically. */

import { GqlContext } from "@/graphql/context";
import {
  CreateGoalArgs,
  CreateManyGoalArgs,
  DeleteGoalArgs,
  DeleteManyGoalArgs,
  FindManyGoalArgs,
  FindUniqueGoalArgs,
  UpdateGoalArgs,
  UpdateManyGoalArgs,
  UpsertGoalArgs,
} from "@/graphql/schema/generated/args/goal.args";
import GoalModel, { Goal } from "@/graphql/schema/generated/models/goal.model";
import { convertFilterForMongo } from "@/graphql/schema/helpers";
import { ObjectIdScalar } from "@/graphql/schema/scalars";
import { GraphQLResolveInfo } from "graphql";
import * as TypeGraphQL from "type-graphql-v2-fork";

@TypeGraphQL.Resolver(() => Goal)
export class GoalResolver {
  @TypeGraphQL.FieldResolver(() => ObjectIdScalar)
  id(@TypeGraphQL.Root() goal: Goal) {
    return goal._id;
  }

  @TypeGraphQL.Query(() => Goal, { nullable: true })
  async goal(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindUniqueGoalArgs
  ): Promise<Goal | null> {
    const filter = convertFilterForMongo(args.where);
    return GoalModel.findOne(filter);
  }

  @TypeGraphQL.Query(() => [Goal], { nullable: false })
  async goals(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindManyGoalArgs
  ): Promise<Goal[]> {
    const filter = convertFilterForMongo(args.where);
    return GoalModel.find(filter ?? {});
  }

  @TypeGraphQL.Mutation(() => Goal)
  async createGoal(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: CreateGoalArgs
  ) {
    const goal = await GoalModel.create(args.data);
    return goal;
  }

  @TypeGraphQL.Mutation(() => [Goal], { nullable: false })
  async createManyGoal(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: CreateManyGoalArgs
  ): Promise<Goal[]> {
    throw new Error("Not implemented");
  }

  @TypeGraphQL.Mutation(() => Goal)
  async updateGoal(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: UpdateGoalArgs
  ) {
    const filter = convertFilterForMongo(args.where);
    const goal = await GoalModel.findOneAndUpdate(filter, args.data, { returnDocument: "after" });
    return goal;
  }

  @TypeGraphQL.Mutation(() => Goal)
  async upsertGoal(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: UpsertGoalArgs
  ) {
    const filter = convertFilterForMongo(args.where);
    const goal = await GoalModel.findOneAndUpdate(filter, args.data, {
      upsert: true,
      new: true,
      returnDocument: "after",
    });
    return goal;
  }

  @TypeGraphQL.Mutation(() => [Goal], { nullable: false })
  async updateManyGoal(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: UpdateManyGoalArgs
  ): Promise<Goal[]> {
    throw new Error("Not implemented");
  }

  @TypeGraphQL.Mutation(() => Goal, { nullable: true })
  async deleteGoal(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: DeleteGoalArgs
  ): Promise<Goal | null> {
    throw new Error("Not implemented");
  }

  @TypeGraphQL.Mutation(() => [Goal], { nullable: false })
  async deleteManyGoal(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: DeleteManyGoalArgs
  ): Promise<Goal[]> {
    throw new Error("Not implemented");
  }
}
