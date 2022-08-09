/* Do not edit this file. It was generated programmatically. */

import * as Scalars from "@/graphql/schema/scalars";
import * as Types from "@/graphql/schema/types";
import { ID, WhereInput, WhereUniqueInput } from "@/graphql/schema/types";
import * as TypeGraphQL from "type-graphql-v2-fork";

@TypeGraphQL.InputType()
export class CalendarEventCreationInput {
  @TypeGraphQL.Field(() => Scalars.ObjectId, { nullable: false })
  userId!: Types.ID;

  @TypeGraphQL.Field(() => Scalars.ObjectId, { nullable: false })
  calendarId!: Types.ID;

  @TypeGraphQL.Field(() => Scalars.String, { nullable: true })
  remoteId?: Types.String | null | undefined;

  @TypeGraphQL.Field(() => Scalars.ObjectId, { nullable: true })
  scheduleId?: Types.ID | null | undefined;

  @TypeGraphQL.Field(() => Scalars.ObjectId, { nullable: true })
  habitId?: Types.ID | null | undefined;

  @TypeGraphQL.Field(() => Scalars.ObjectId, { nullable: true })
  taskId?: Types.ID | null | undefined;

  @TypeGraphQL.Field(() => Scalars.String, { nullable: false })
  title!: Types.String;

  @TypeGraphQL.Field(() => Scalars.DateTime, { nullable: false })
  start!: Types.DateTime;

  @TypeGraphQL.Field(() => Scalars.DateTime, { nullable: true })
  end?: Types.DateTime | null | undefined;

  @TypeGraphQL.Field(() => Scalars.Boolean, { nullable: true })
  allDay?: Types.Boolean | null | undefined;

  @TypeGraphQL.Field(() => Scalars.String, { nullable: true })
  notes?: Types.String | null | undefined;

  @TypeGraphQL.Field(() => Scalars.Boolean, { nullable: true })
  canceled?: Types.Boolean | null | undefined;

  @TypeGraphQL.Field(() => Scalars.DateTime, { nullable: true })
  archivedAt?: Types.DateTime | null | undefined;
}

@TypeGraphQL.InputType()
export class CalendarEventUpdateInput {
  @TypeGraphQL.Field(() => Scalars.ObjectId, { nullable: true })
  userId?: Types.ID | undefined;

  @TypeGraphQL.Field(() => Scalars.ObjectId, { nullable: true })
  calendarId?: Types.ID | undefined;

  @TypeGraphQL.Field(() => Scalars.String, { nullable: true })
  remoteId?: Types.String | null | undefined;

  @TypeGraphQL.Field(() => Scalars.ObjectId, { nullable: true })
  scheduleId?: Types.ID | null | undefined;

  @TypeGraphQL.Field(() => Scalars.ObjectId, { nullable: true })
  habitId?: Types.ID | null | undefined;

  @TypeGraphQL.Field(() => Scalars.ObjectId, { nullable: true })
  taskId?: Types.ID | null | undefined;

  @TypeGraphQL.Field(() => Scalars.String, { nullable: true })
  title?: Types.String | undefined;

  @TypeGraphQL.Field(() => Scalars.DateTime, { nullable: true })
  start?: Types.DateTime | undefined;

  @TypeGraphQL.Field(() => Scalars.DateTime, { nullable: true })
  end?: Types.DateTime | null | undefined;

  @TypeGraphQL.Field(() => Scalars.Boolean, { nullable: true })
  allDay?: Types.Boolean | null | undefined;

  @TypeGraphQL.Field(() => Scalars.String, { nullable: true })
  notes?: Types.String | null | undefined;

  @TypeGraphQL.Field(() => Scalars.Boolean, { nullable: true })
  canceled?: Types.Boolean | null | undefined;

  @TypeGraphQL.Field(() => Scalars.DateTime, { nullable: true })
  archivedAt?: Types.DateTime | null | undefined;
}

@TypeGraphQL.InputType()
export class CalendarEventWhereInput extends WhereInput {
  @TypeGraphQL.Field(() => Scalars.ObjectIdScalar, { nullable: true })
  id?: ID | undefined;

  @TypeGraphQL.Field(() => Scalars.ObjectId, { nullable: true })
  userId?: Types.ID | null | undefined;

  @TypeGraphQL.Field(() => Scalars.ObjectId, { nullable: true })
  calendarId?: Types.ID | null | undefined;

  @TypeGraphQL.Field(() => Scalars.String, { nullable: true })
  remoteId?: Types.String | undefined;

  @TypeGraphQL.Field(() => Scalars.ObjectId, { nullable: true })
  scheduleId?: Types.ID | undefined;

  @TypeGraphQL.Field(() => Scalars.ObjectId, { nullable: true })
  habitId?: Types.ID | undefined;

  @TypeGraphQL.Field(() => Scalars.ObjectId, { nullable: true })
  taskId?: Types.ID | undefined;

  @TypeGraphQL.Field(() => Scalars.String, { nullable: true })
  title?: Types.String | null | undefined;

  @TypeGraphQL.Field(() => Scalars.DateTime, { nullable: true })
  start?: Types.DateTime | null | undefined;

  @TypeGraphQL.Field(() => Scalars.DateTime, { nullable: true })
  end?: Types.DateTime | undefined;

  @TypeGraphQL.Field(() => Scalars.Boolean, { nullable: true })
  allDay?: Types.Boolean | undefined;

  @TypeGraphQL.Field(() => Scalars.String, { nullable: true })
  notes?: Types.String | undefined;

  @TypeGraphQL.Field(() => Scalars.Boolean, { nullable: true })
  canceled?: Types.Boolean | undefined;
}

@TypeGraphQL.InputType()
export class CalendarEventWhereUniqueInput extends WhereUniqueInput {
  // @TypeGraphQL.Field(() => Scalars.ObjectIdScalar, { nullable: false })
  // id!: ID;
}
