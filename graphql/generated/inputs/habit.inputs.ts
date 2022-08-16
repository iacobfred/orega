/* Do not edit this file. It was generated programmatically. */

import { DateTimeScalar, Int, ObjectIdScalar } from "@/graphql/schema/scalars";
import { DateTime, ID, WhereInput, WhereUniqueInput } from "@/graphql/schema/types";
import * as TypeGraphQL from "type-graphql-v2-fork";

@TypeGraphQL.InputType()
export class HabitCreationInput {
  @TypeGraphQL.Field(() => ObjectIdScalar, { nullable: false })
  userId!: string;

  @TypeGraphQL.Field(() => String, { nullable: false })
  name!: string;

  @TypeGraphQL.Field(() => Boolean, { nullable: true })
  public?: boolean | undefined;

  @TypeGraphQL.Field(() => String, { nullable: true })
  chronString?: string | null | undefined;

  @TypeGraphQL.Field(() => Int, { nullable: true })
  defaultDurationInMinutes?: number | null | undefined;

  @TypeGraphQL.Field(() => DateTimeScalar, { nullable: true })
  archivedAt?: DateTime | null | undefined;
}

@TypeGraphQL.InputType()
export class HabitUpdateInput {
  @TypeGraphQL.Field(() => ObjectIdScalar, { nullable: true })
  userId?: string | undefined;

  @TypeGraphQL.Field(() => String, { nullable: true })
  name?: string | undefined;

  @TypeGraphQL.Field(() => Boolean, { nullable: true })
  public?: boolean | undefined;

  @TypeGraphQL.Field(() => String, { nullable: true })
  chronString?: string | null | undefined;

  @TypeGraphQL.Field(() => Int, { nullable: true })
  defaultDurationInMinutes?: number | null | undefined;

  @TypeGraphQL.Field(() => DateTimeScalar, { nullable: true })
  archivedAt?: DateTime | null | undefined;
}

@TypeGraphQL.InputType()
export class HabitWhereInput extends WhereInput {
  @TypeGraphQL.Field(() => ObjectIdScalar, { nullable: true })
  id?: ID | undefined;

  @TypeGraphQL.Field(() => ObjectIdScalar, { nullable: true })
  userId?: string | null | undefined;

  @TypeGraphQL.Field(() => String, { nullable: true })
  name?: string | null | undefined;

  @TypeGraphQL.Field(() => Boolean, { nullable: true })
  public?: boolean | undefined;

  @TypeGraphQL.Field(() => String, { nullable: true })
  chronString?: string | undefined;

  @TypeGraphQL.Field(() => Int, { nullable: true })
  defaultDurationInMinutes?: number | undefined;
}

@TypeGraphQL.InputType()
export class HabitWhereUniqueInput extends WhereUniqueInput {
  // @TypeGraphQL.Field(() => ObjectIdScalar, { nullable: false })
  // id!: ID;
}
