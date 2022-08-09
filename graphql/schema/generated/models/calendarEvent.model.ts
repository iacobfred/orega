/* Do not edit this file. It was generated programmatically. */

import { DEFAULT_MODEL_OPTIONS } from "@/graphql/schema/constants";
import definition from "@/graphql/schema/definitions/CalendarEvent";
import * as Scalars from "@/graphql/schema/scalars";
import * as Types from "@/graphql/schema/types";
import { Model } from "@/graphql/schema/types";
import { getModelForClass, ModelOptions, post, pre, prop as Property } from "@typegoose/typegoose";
import * as TypeGraphQL from "type-graphql-v2-fork";

@TypeGraphQL.ObjectType()
@ModelOptions(DEFAULT_MODEL_OPTIONS)
@pre<CalendarEvent>(
  "save",
  (definition?.hooks?.save?.pre as any) ??
    async function (next) {
      return next();
    }
)
@post<CalendarEvent>(
  "save",
  definition?.hooks?.save?.post ??
    (async (_instance) => {
      return;
    })
)
export class CalendarEvent extends Model {
  @TypeGraphQL.Field(() => Scalars.ObjectId, { nullable: false })
  @Property({ required: true })
  userId!: Types.ID;

  @TypeGraphQL.Field(() => Scalars.ObjectId, { nullable: false })
  @Property({ required: true })
  calendarId!: Types.ID;

  @TypeGraphQL.Field(() => Scalars.String, { nullable: true })
  @Property({ type: () => String, required: false, default: null })
  remoteId?: Types.String | null;

  @TypeGraphQL.Field(() => Scalars.ObjectId, { nullable: true })
  @Property({ required: false, default: null })
  scheduleId?: Types.ID | null;

  @TypeGraphQL.Field(() => Scalars.ObjectId, { nullable: true })
  @Property({ required: false, default: null })
  habitId?: Types.ID | null;

  @TypeGraphQL.Field(() => Scalars.ObjectId, { nullable: true })
  @Property({ required: false, default: null })
  taskId?: Types.ID | null;

  @TypeGraphQL.Field(() => Scalars.String, { nullable: false })
  @Property({ type: () => String, required: true })
  title!: Types.String;

  @TypeGraphQL.Field(() => Scalars.DateTime, { nullable: false })
  @Property({ required: true })
  start!: Types.DateTime;

  @TypeGraphQL.Field(() => Scalars.DateTime, { nullable: true })
  @Property({ required: false, default: null })
  end?: Types.DateTime | null;

  @TypeGraphQL.Field(() => Scalars.Boolean, { nullable: true })
  @Property({ type: () => Boolean, required: false, default: false })
  allDay?: Types.Boolean | null;

  @TypeGraphQL.Field(() => Scalars.String, { nullable: true })
  @Property({ type: () => String, required: false, default: null })
  notes?: Types.String | null;

  @TypeGraphQL.Field(() => Scalars.Boolean, { nullable: true })
  @Property({ type: () => Boolean, required: false, default: null })
  canceled?: Types.Boolean | null;
}

const CalendarEventModel = getModelForClass<typeof CalendarEvent>(CalendarEvent);
export default CalendarEventModel;
