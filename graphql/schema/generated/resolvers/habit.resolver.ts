/* Do not edit this file. It was generated programmatically. */

import { GqlContext } from "@/graphql/context";
import {
  CreateHabitArgs,
  CreateManyHabitArgs,
  DeleteHabitArgs,
  DeleteManyHabitArgs,
  FindManyHabitArgs,
  FindUniqueHabitArgs,
  UpdateHabitArgs,
  UpdateManyHabitArgs,
  UpsertHabitArgs,
} from "@/graphql/schema/generated/args/habit.args";
import HabitModel, { Habit } from "@/graphql/schema/generated/models/habit.model";
import UserModel from "@/graphql/schema/generated/models/user.model";
import { convertFilterForMongo } from "@/graphql/schema/helpers";
import { ObjectIdScalar } from "@/graphql/schema/scalars";
import { GraphQLResolveInfo } from "graphql";
import * as TypeGraphQL from "type-graphql-v2-fork";

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
    const filter = convertFilterForMongo(args.where);
    return HabitModel.findOne(filter);
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
    @TypeGraphQL.Args() args: CreateHabitArgs
  ) {
    const habit = await HabitModel.create(args.data);
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
    @TypeGraphQL.Args() args: CreateManyHabitArgs
  ): Promise<Habit[]> {
    throw new Error("Not implemented");
  }

  @TypeGraphQL.Mutation(() => Habit)
  async updateHabit(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: UpdateHabitArgs
  ) {
    const filter = convertFilterForMongo(args.where);
    const habit = await HabitModel.findOneAndUpdate(filter, args.data, { returnDocument: "after" });
    habit &&
      UserModel.findOneAndUpdate(
        { _id: habit.userId, "habits._id": habit._id },
        {
          $set: { "habits.$": { ...habit } },
        }
      );
    return habit;
  }

  @TypeGraphQL.Mutation(() => Habit)
  async upsertHabit(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: UpsertHabitArgs
  ) {
    const filter = convertFilterForMongo(args.where);
    const habit = await HabitModel.findOneAndUpdate(filter, args.data, {
      upsert: true,
      new: true,
      returnDocument: "after",
    });
    return habit;
  }

  @TypeGraphQL.Mutation(() => [Habit], { nullable: false })
  async updateManyHabit(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: UpdateManyHabitArgs
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
