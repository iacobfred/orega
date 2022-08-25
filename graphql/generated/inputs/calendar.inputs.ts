/* Do not edit this file. It was generated programmatically. */

import { DateTimeScalar, ObjectIdScalar } from "@/graphql/schema/scalars";
import { ID, WhereInput, WhereUniqueInput } from "@/graphql/schema/types";
import * as TypeGraphQL from "type-graphql-v2-fork";

@TypeGraphQL.InputType()
export class CalendarCreationInput {
  @TypeGraphQL.Field(() => ObjectIdScalar, { nullable: false })
  userId!: string;

  @TypeGraphQL.Field(() => String, { nullable: false })
  name!: string;

  @TypeGraphQL.Field(() => String, { nullable: true })
  color?: string | null | undefined;

  @TypeGraphQL.Field(() => String, { nullable: true })
  provider?: string | null | undefined;

  @TypeGraphQL.Field(() => String, { nullable: true })
  remoteId?: string | null | undefined;

  @TypeGraphQL.Field(() => String, { nullable: true })
  syncToken?: string | null | undefined;

  @TypeGraphQL.Field(() => ObjectIdScalar, { nullable: true })
  accountId?: string | null | undefined;

  @TypeGraphQL.Field(() => Boolean, { nullable: true })
  primary?: boolean | null | undefined;

  @TypeGraphQL.Field(() => Boolean, { nullable: true })
  public?: boolean | null | undefined;

  @TypeGraphQL.Field(() => Boolean, { nullable: true })
  enabled?: boolean | undefined;

  @TypeGraphQL.Field(() => DateTimeScalar, { nullable: true })
  archivedAt?: Date | null | undefined;
}

@TypeGraphQL.InputType()
export class CalendarUpdateInput {
  @TypeGraphQL.Field(() => ObjectIdScalar, { nullable: true })
  userId?: string | undefined;

  @TypeGraphQL.Field(() => String, { nullable: true })
  name?: string | undefined;

  @TypeGraphQL.Field(() => String, { nullable: true })
  color?: string | null | undefined;

  @TypeGraphQL.Field(() => String, { nullable: true })
  provider?: string | null | undefined;

  @TypeGraphQL.Field(() => String, { nullable: true })
  remoteId?: string | null | undefined;

  @TypeGraphQL.Field(() => String, { nullable: true })
  syncToken?: string | null | undefined;

  @TypeGraphQL.Field(() => ObjectIdScalar, { nullable: true })
  accountId?: string | null | undefined;

  @TypeGraphQL.Field(() => Boolean, { nullable: true })
  primary?: boolean | null | undefined;

  @TypeGraphQL.Field(() => Boolean, { nullable: true })
  public?: boolean | null | undefined;

  @TypeGraphQL.Field(() => Boolean, { nullable: true })
  enabled?: boolean | undefined;

  @TypeGraphQL.Field(() => DateTimeScalar, { nullable: true })
  archivedAt?: Date | null | undefined;
}

@TypeGraphQL.InputType()
export class CalendarWhereInput extends WhereInput {
  @TypeGraphQL.Field(() => ObjectIdScalar, { nullable: true })
  id?: ID | undefined;

  @TypeGraphQL.Field(() => ObjectIdScalar, { nullable: true })
  userId?: string | null | undefined;

  @TypeGraphQL.Field(() => String, { nullable: true })
  name?: string | null | undefined;

  @TypeGraphQL.Field(() => String, { nullable: true })
  color?: string | undefined;

  @TypeGraphQL.Field(() => String, { nullable: true })
  provider?: string | undefined;

  @TypeGraphQL.Field(() => String, { nullable: true })
  remoteId?: string | undefined;

  @TypeGraphQL.Field(() => String, { nullable: true })
  syncToken?: string | undefined;

  @TypeGraphQL.Field(() => ObjectIdScalar, { nullable: true })
  accountId?: string | undefined;

  @TypeGraphQL.Field(() => Boolean, { nullable: true })
  primary?: boolean | undefined;

  @TypeGraphQL.Field(() => Boolean, { nullable: true })
  public?: boolean | undefined;

  @TypeGraphQL.Field(() => Boolean, { nullable: true })
  enabled?: boolean | undefined;
}

@TypeGraphQL.InputType()
export class CalendarWhereUniqueInput extends WhereUniqueInput {
  // @TypeGraphQL.Field(() => ObjectIdScalar, { nullable: false })
  // id!: ID;
}
