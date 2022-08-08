/* Do not edit this file. It was generated programmatically. */

import { DEFAULT_MODEL_OPTIONS } from "@/graphql/schema/constants";
import definition from "@/graphql/schema/definitions/Goal";
import * as Scalars from "@/graphql/schema/scalars";
import * as Types from "@/graphql/schema/types";
import { Model } from "@/graphql/schema/types";
import { getModelForClass, ModelOptions, post, pre, prop as Property } from "@typegoose/typegoose";
import * as TypeGraphQL from "type-graphql-v2-fork";

@TypeGraphQL.ObjectType()
@ModelOptions(DEFAULT_MODEL_OPTIONS)
@pre<Goal>(
  "save",
  (definition?.hooks?.save?.pre as any) ??
    async function (next) {
      return next();
    }
)
@post<Goal>(
  "save",
  definition?.hooks?.save?.post ??
    (async (_instance) => {
      return;
    })
)
export class Goal extends Model {
  @TypeGraphQL.Field(() => Scalars.ObjectId, { nullable: true })
  @Property({ required: false, default: null })
  habitId?: Types.ID | null;

  @TypeGraphQL.Field(() => Scalars.ObjectId, { nullable: true })
  @Property({ required: false, default: null })
  parentId?: Types.ID | null;

  @TypeGraphQL.Field(() => Scalars.String, { nullable: false })
  @Property({ type: () => String, required: true })
  description!: Types.String;
}

const GoalModel = getModelForClass<typeof Goal>(Goal);
export default GoalModel;
