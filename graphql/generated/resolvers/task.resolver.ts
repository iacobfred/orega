/* Do not edit this file. It was generated programmatically. */

import { GqlContext } from "@/graphql/context";
import {
  ArgsForUpdatingManyTasks,
  DeleteManyTaskArgs,
  DeleteTaskArgs,
  FindManyTaskArgs,
  FindUniqueTaskArgs,
  TaskCreationArgs,
  TasksCreationArgs,
  TaskUpdateArgs,
  TaskUpsertionArgs,
} from "@/graphql/generated/args/task.args";
import TaskModel from "@/graphql/generated/models/TaskModel";
import UserModel from "@/graphql/generated/models/UserModel";
import Task from "@/graphql/generated/types/Task";
import { convertFilterForMongo } from "@/graphql/schema/helpers";
import { ObjectIdScalar } from "@/graphql/schema/scalars";
import { GraphQLResolveInfo } from "graphql";
import * as TypeGraphQL from "type-graphql-v2-fork";

@TypeGraphQL.Resolver(() => Task)
export class TaskResolver {
  @TypeGraphQL.FieldResolver(() => ObjectIdScalar)
  id(@TypeGraphQL.Root() task: Task) {
    return task._id;
  }

  @TypeGraphQL.Query(() => Task, { nullable: true })
  async task(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindUniqueTaskArgs
  ): Promise<Task | null> {
    const filter = convertFilterForMongo(args.where);
    return TaskModel.findOne(filter);
  }

  @TypeGraphQL.Query(() => [Task], { nullable: false })
  async tasks(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindManyTaskArgs
  ): Promise<Task[]> {
    const filter = convertFilterForMongo(args.where);
    return TaskModel.find(filter ?? {});
  }

  @TypeGraphQL.Mutation(() => Task)
  async createTask(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: TaskCreationArgs
  ) {
    const task = await TaskModel.create(args.data);
    if (task) {
      // NOTE: This update fails if it's not awaited.
      await UserModel.findOneAndUpdate({ _id: task.userId }, { $push: { tasks: { ...task } } });
    }
    return task;
  }

  @TypeGraphQL.Mutation(() => [Task], { nullable: false })
  async createManyTask(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: TasksCreationArgs
  ): Promise<Task[]> {
    throw new Error("Not implemented");
  }

  @TypeGraphQL.Mutation(() => Task)
  async updateTask(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: TaskUpdateArgs
  ) {
    const filter = convertFilterForMongo(args.where);
    const task = await TaskModel.findOneAndUpdate(filter, args.data, { returnDocument: "after" });
    // NOTE: This update fails if it's not awaited.
    task &&
      (await UserModel.findOneAndUpdate(
        { _id: task.userId, "tasks._id": task._id },
        {
          $set: { "tasks.$": { ...task } },
        }
      ));
    return task;
  }

  @TypeGraphQL.Mutation(() => Task)
  async upsertTask(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: TaskUpsertionArgs
  ) {
    const filter = convertFilterForMongo(args.where);
    const task = await TaskModel.findOneAndUpdate(filter, args.data, {
      upsert: true,
      new: true,
      returnDocument: "after",
    });
    return task;
  }

  @TypeGraphQL.Mutation(() => [Task], { nullable: false })
  async updateTasks(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: ArgsForUpdatingManyTasks
  ): Promise<Task[]> {
    throw new Error("Not implemented");
  }

  @TypeGraphQL.Mutation(() => [Task], { nullable: false })
  async updateTasksDistinctly(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: ArgsForUpdatingManyTasks
  ): Promise<Task[]> {
    throw new Error("Not implemented");
  }

  @TypeGraphQL.Mutation(() => Task, { nullable: true })
  async deleteTask(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: DeleteTaskArgs
  ): Promise<Task | null> {
    throw new Error("Not implemented");
  }

  @TypeGraphQL.Mutation(() => [Task], { nullable: false })
  async deleteManyTask(
    @TypeGraphQL.Ctx() ctx: GqlContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: DeleteManyTaskArgs
  ): Promise<Task[]> {
    throw new Error("Not implemented");
  }
}
