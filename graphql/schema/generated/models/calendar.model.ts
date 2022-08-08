/* Do not edit this file. It was generated programmatically. */

import { DEFAULT_MODEL_OPTIONS } from "@/graphql/schema/constants";
import definition from "@/graphql/schema/definitions/Calendar";
import * as Scalars from "@/graphql/schema/scalars";
import * as Types from "@/graphql/schema/types";
import { Model } from "@/graphql/schema/types";
import { getModelForClass, ModelOptions, post, pre, prop as Property } from "@typegoose/typegoose";
import * as TypeGraphQL from "type-graphql-v2-fork";

@TypeGraphQL.ObjectType()
@ModelOptions(DEFAULT_MODEL_OPTIONS)
@pre<Calendar>(
  "save",
  (definition?.hooks?.save?.pre as any) ??
    async function (next) {
      return next();
    }
)
@post<Calendar>(
  "save",
  definition?.hooks?.save?.post ??
    (async (_instance) => {
      return;
    })
)
export class Calendar extends Model {
  @TypeGraphQL.Field(() => Scalars.ObjectId, { nullable: false })
  @Property({ required: true })
  userId!: Types.ID;

  @TypeGraphQL.Field(() => Scalars.String, { nullable: false })
  @Property({ type: () => String, required: true })
  name!: Types.String;

  @TypeGraphQL.Field(() => Scalars.String, { nullable: true })
  @Property({ type: () => String, required: false, default: null })
  color?: Types.String | null;

  @TypeGraphQL.Field(() => Scalars.String, { nullable: true })
  @Property({ type: () => String, required: false, default: null })
  provider?: Types.String | null;

  @TypeGraphQL.Field(() => Scalars.String, { nullable: true })
  @Property({ type: () => String, required: false, default: null })
  remoteId?: Types.String | null;

  @TypeGraphQL.Field(() => Scalars.String, { nullable: true })
  @Property({ type: () => String, required: false, default: null })
  syncToken?: Types.String | null;

  @TypeGraphQL.Field(() => Scalars.ObjectId, { nullable: true })
  @Property({ required: false, default: null })
  accountId?: Types.ID | null;

  @TypeGraphQL.Field(() => Scalars.Boolean, { nullable: true })
  @Property({ type: () => Boolean, required: false, default: null })
  primary?: Types.Boolean | null;

  @TypeGraphQL.Field(() => Scalars.Boolean, { nullable: true })
  @Property({ type: () => Boolean, required: false, default: null })
  public?: Types.Boolean | null;

  @TypeGraphQL.Field(() => Scalars.Boolean, { nullable: true })
  @Property({ type: () => Boolean, required: false, default: true })
  enabled?: Types.Boolean | null;
}

const CalendarModel = getModelForClass<typeof Calendar>(Calendar);
export default CalendarModel;
