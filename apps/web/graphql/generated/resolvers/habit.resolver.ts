/* Do not edit this file. It was generated programmatically. */

import * as TypeGraphQL from "type-graphql-v2-fork";
import Habit from "@web/generated/types/Habit";
import HabitModel from "@web/generated/models/HabitModel";
import {
  HabitCreationArgs,
  HabitsCreationArgs,
  DeleteHabitArgs,
  DeleteManyHabitArgs,
  FindManyHabitArgs,
  FindUniqueHabitArgs,
  HabitUpdateArgs,
  ArgsForUpdatingManyHabits,
  HabitUpsertionArgs,
} from "@web/graphql/generated/args/habit.args";
import type { GqlContext } from "@web/graphql/context";
import type { GraphQLResolveInfo } from "graphql";
import { convertFilterForMongo } from "@web/graphql/schema/helpers";
import { ObjectIdScalar } from "@web/graphql/schema/scalars";
import {
  createHabit as _createHabit,
  updateHabit as _updateHabit,
  upsertHabit as _upsertHabit,
  findHabit as _findHabit,
} from "@web/generated/shortcuts/habit.shortcuts";
import UserModel from "@web/generated/models/UserModel";

@TypeGraphQL.Resolver(() => Habit)
export class HabitResolver {
  @TypeGraphQL.FieldResolver(() => ObjectIdScalar)
  id(@TypeGraphQL.Root() habit: Habit) {
    return habit._id;
  }

  @TypeGraphQL.Query(() => Habit, { nullable: true })
  async habit(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindUniqueHabitArgs
  ): Promise<Habit | null> {
    return _findHabit(args);
  }

  @TypeGraphQL.Query(() => [Habit], { nullable: false })
  async habits(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindManyHabitArgs
  ): Promise<Habit[]> {
    const filter = convertFilterForMongo(args.where);
    return HabitModel.find(filter ?? {});
  }

  @TypeGraphQL.Mutation(() => Habit)
  async createHabit(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: HabitCreationArgs
  ) {
    const habit = await _createHabit(args);
    if (habit) {
      // NOTE: This update fails if it's not awaited.
      await UserModel.findOneAndUpdate({ _id: habit.userId }, { $push: { habits: { ...habit } } });
    }
    return habit;
  }

  @TypeGraphQL.Mutation(() => [Habit], { nullable: false })
  async createManyHabit(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: HabitsCreationArgs
  ): Promise<Habit[]> {
    throw new Error("Not implemented");
  }

  @TypeGraphQL.Mutation(() => Habit)
  async updateHabit(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: HabitUpdateArgs
  ) {
    return _updateHabit(args);
  }

  @TypeGraphQL.Mutation(() => Habit)
  async upsertHabit(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: HabitUpsertionArgs
  ) {
    return _upsertHabit(args);
  }

  @TypeGraphQL.Mutation(() => [Habit], { nullable: false })
  async updateHabits(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: ArgsForUpdatingManyHabits
  ): Promise<Habit[]> {
    throw new Error("Not implemented");
  }

  @TypeGraphQL.Mutation(() => [Habit], { nullable: false })
  async updateHabitsDistinctly(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: ArgsForUpdatingManyHabits
  ): Promise<Habit[]> {
    throw new Error("Not implemented");
  }

  @TypeGraphQL.Mutation(() => Habit, { nullable: true })
  async deleteHabit(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: DeleteHabitArgs
  ): Promise<Habit | null> {
    throw new Error("Not implemented");
  }

  @TypeGraphQL.Mutation(() => [Habit], { nullable: false })
  async deleteManyHabit(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: DeleteManyHabitArgs
  ): Promise<Habit[]> {
    throw new Error("Not implemented");
  }
}
