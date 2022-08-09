/* Do not edit this file. It was generated programmatically. */

import {
  HabitCreationInput,
  HabitUpdateInput,
  HabitWhereInput,
  HabitWhereUniqueInput,
} from "@/graphql/schema/generated/inputs/habit.inputs";
import * as TypeGraphQL from "type-graphql-v2-fork";

@TypeGraphQL.ArgsType()
export class HabitCreationArgs {
  @TypeGraphQL.Field(() => HabitCreationInput, { nullable: false })
  data!: HabitCreationInput;
}

@TypeGraphQL.ArgsType()
export class HabitsCreationArgs {
  @TypeGraphQL.Field(() => HabitCreationInput, { nullable: false })
  data!: HabitCreationInput;
}

@TypeGraphQL.ArgsType()
export class DeleteHabitArgs {
  @TypeGraphQL.Field(() => HabitWhereUniqueInput, { nullable: false })
  where!: HabitWhereUniqueInput;
}

@TypeGraphQL.ArgsType()
export class DeleteManyHabitArgs {
  @TypeGraphQL.Field(() => HabitWhereInput, { nullable: false })
  where!: HabitWhereInput;
}

@TypeGraphQL.ArgsType()
export class FindUniqueHabitArgs {
  @TypeGraphQL.Field(() => HabitWhereUniqueInput, { nullable: false })
  where!: HabitWhereUniqueInput;
}

@TypeGraphQL.ArgsType()
export class FindManyHabitArgs {
  @TypeGraphQL.Field(() => HabitWhereInput, { nullable: true })
  where?: HabitWhereInput;
}

@TypeGraphQL.ArgsType()
export class HabitUpdateArgs {
  @TypeGraphQL.Field(() => HabitWhereUniqueInput, { nullable: false })
  where!: HabitWhereUniqueInput;

  @TypeGraphQL.Field(() => HabitUpdateInput, { nullable: false })
  data!: HabitUpdateInput;
}

@TypeGraphQL.ArgsType()
export class ArgsForUpdatingManyHabits {
  @TypeGraphQL.Field(() => HabitWhereInput, { nullable: false })
  where!: HabitWhereUniqueInput;

  @TypeGraphQL.Field(() => HabitUpdateInput, { nullable: false })
  data!: HabitUpdateInput;
}

@TypeGraphQL.ArgsType()
export class DistinctHabitsUpdateArgs {
  @TypeGraphQL.Field(() => [HabitUpdateArgs], { nullable: false })
  data!: HabitUpdateArgs[];
}

@TypeGraphQL.ArgsType()
export class HabitUpsertionArgs {
  @TypeGraphQL.Field(() => HabitWhereUniqueInput, { nullable: false })
  where!: HabitWhereUniqueInput;

  @TypeGraphQL.Field(() => HabitCreationInput, { nullable: false })
  data!: HabitCreationInput;

  // @TypeGraphQL.Field(() => HabitUpdateInput, { nullable: false })
  // update!: HabitUpdateInput;
}
