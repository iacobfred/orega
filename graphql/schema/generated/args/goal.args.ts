/* Do not edit this file. It was generated programmatically. */

import {
  GoalCreateInput,
  GoalUpdateInput,
  GoalWhereInput,
  GoalWhereUniqueInput,
} from "@/graphql/schema/generated/inputs/goal.inputs";
import * as TypeGraphQL from "type-graphql-v2-fork";

@TypeGraphQL.ArgsType()
export class CreateGoalArgs {
  @TypeGraphQL.Field(() => GoalCreateInput, { nullable: false })
  data!: GoalCreateInput;
}

@TypeGraphQL.ArgsType()
export class CreateManyGoalArgs {
  @TypeGraphQL.Field(() => GoalCreateInput, { nullable: false })
  data!: GoalCreateInput;
}

@TypeGraphQL.ArgsType()
export class DeleteGoalArgs {
  @TypeGraphQL.Field(() => GoalWhereUniqueInput, { nullable: false })
  where!: GoalWhereUniqueInput;
}

@TypeGraphQL.ArgsType()
export class DeleteManyGoalArgs {
  @TypeGraphQL.Field(() => GoalWhereInput, { nullable: false })
  where!: GoalWhereInput;
}

@TypeGraphQL.ArgsType()
export class FindUniqueGoalArgs {
  @TypeGraphQL.Field(() => GoalWhereUniqueInput, { nullable: false })
  where!: GoalWhereUniqueInput;
}

@TypeGraphQL.ArgsType()
export class FindManyGoalArgs {
  @TypeGraphQL.Field(() => GoalWhereInput, { nullable: true })
  where?: GoalWhereInput;
}

@TypeGraphQL.ArgsType()
export class UpdateGoalArgs {
  @TypeGraphQL.Field(() => GoalWhereUniqueInput, { nullable: false })
  where!: GoalWhereUniqueInput;

  @TypeGraphQL.Field(() => GoalUpdateInput, { nullable: false })
  data!: GoalUpdateInput;
}

@TypeGraphQL.ArgsType()
export class UpdateManyGoalArgs {
  @TypeGraphQL.Field(() => GoalWhereInput, { nullable: false })
  where!: GoalWhereUniqueInput;

  @TypeGraphQL.Field(() => GoalUpdateInput, { nullable: false })
  data!: GoalUpdateInput;
}

@TypeGraphQL.ArgsType()
export class UpsertGoalArgs {
  @TypeGraphQL.Field(() => GoalWhereUniqueInput, { nullable: false })
  where!: GoalWhereUniqueInput;

  @TypeGraphQL.Field(() => GoalCreateInput, { nullable: false })
  data!: GoalCreateInput;

  // @TypeGraphQL.Field(() => GoalUpdateInput, { nullable: false })
  // update!: GoalUpdateInput;
}
