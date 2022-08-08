/* Do not edit this file. It was generated programmatically. */

import { DEFAULT_MODEL_OPTIONS } from "@/graphql/schema/constants";
import definition from "@/graphql/schema/definitions/Identity";
import * as Scalars from "@/graphql/schema/scalars";
import * as Types from "@/graphql/schema/types";
import { Model } from "@/graphql/schema/types";
import { getModelForClass, ModelOptions, post, pre, prop as Property } from "@typegoose/typegoose";
import * as TypeGraphQL from "type-graphql-v2-fork";

@TypeGraphQL.ObjectType()
@ModelOptions(DEFAULT_MODEL_OPTIONS)
@pre<Identity>(
  "save",
  (definition?.hooks?.save?.pre as any) ??
    async function (next) {
      return next();
    }
)
@post<Identity>(
  "save",
  definition?.hooks?.save?.post ??
    (async (_instance) => {
      return;
    })
)
export class Identity extends Model {
  @TypeGraphQL.Field(() => Scalars.ObjectId, { nullable: false })
  @Property({ required: true })
  userId!: Types.ID;

  @TypeGraphQL.Field(() => Scalars.String, { nullable: false })
  @Property({ type: () => String, required: true })
  name!: Types.String;

  @TypeGraphQL.Field(() => Scalars.String, { nullable: true })
  @Property({ type: () => String, required: false, default: null })
  description?: Types.String | null;
}

const IdentityModel = getModelForClass<typeof Identity>(Identity);
export default IdentityModel;
