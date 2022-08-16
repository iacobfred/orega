/* Do not edit this file. It was generated programmatically. */

import { DEFAULT_MODEL_OPTIONS } from "@/graphql/schema/constants";
import definition from "@/graphql/schema/definitions/Notebook";
import { ObjectIdScalar } from "@/graphql/schema/scalars";
import { Model } from "@/graphql/schema/types";
import { getModelForClass, ModelOptions, post, pre, prop as Property } from "@typegoose/typegoose";
import * as TypeGraphQL from "type-graphql-v2-fork";
// import { NotebookFragment } from "@/graphql/generated/fragments/notebook.fragment";

@TypeGraphQL.ObjectType()
@ModelOptions(DEFAULT_MODEL_OPTIONS)
@pre<Notebook>(
  "save",
  (definition?.hooks?.save?.pre as any) ??
    async function (next) {
      return next();
    }
)
@post<Notebook>(
  "save",
  definition?.hooks?.save?.post ??
    (async (_instance) => {
      return;
    })
)
export class Notebook extends Model {
  // declare readonly __types__: {
  //   fragment: NotebookFragment;
  //   mutationResponses: {
  //     create: { createNotebook: NotebookFragment };
  //     update: { updateNotebook: NotebookFragment };
  //     upsert: { upsertNotebook: NotebookFragment };
  //     delete: { deleteNotebook: NotebookFragment };
  //   };
  // }
  @TypeGraphQL.Field(() => ObjectIdScalar, { nullable: false })
  @Property({ required: true })
  userId!: string;

  @TypeGraphQL.Field(() => String, { nullable: false })
  @Property({ type: () => String, required: true })
  title!: string;

  @TypeGraphQL.Field(() => String, { nullable: true })
  @Property({ type: () => String, required: false, default: null })
  description?: string | null;

  @TypeGraphQL.Field(() => Boolean, { nullable: true })
  @Property({ type: () => Boolean, required: false, default: null })
  public?: boolean | null;
}

const NotebookModel = getModelForClass<typeof Notebook>(Notebook);
export default NotebookModel;
