/* Do not edit this file. It was generated programmatically. */

import { DEFAULT_MODEL_OPTIONS } from "@/graphql/schema/constants";
import definition from "@/graphql/schema/definitions/ListItem";
import { JSONResolver, ObjectIdScalar } from "@/graphql/schema/scalars";
import { Model } from "@/graphql/schema/types";
import { getModelForClass, ModelOptions, post, pre, prop as Property } from "@typegoose/typegoose";
import * as TypeGraphQL from "type-graphql-v2-fork";
// import { ListItemFragment } from "@/graphql/generated/fragments/listItem.fragment";

@TypeGraphQL.ObjectType()
@ModelOptions(DEFAULT_MODEL_OPTIONS)
@pre<ListItem>(
  "save",
  (definition?.hooks?.save?.pre as any) ??
    async function (next) {
      return next();
    }
)
@post<ListItem>(
  "save",
  definition?.hooks?.save?.post ??
    (async (_instance) => {
      return;
    })
)
export class ListItem extends Model {
  // declare readonly __types__: {
  //   fragment: ListItemFragment;
  //   mutationResponses: {
  //     create: { createListItem: ListItemFragment };
  //     update: { updateListItem: ListItemFragment };
  //     upsert: { upsertListItem: ListItemFragment };
  //     delete: { deleteListItem: ListItemFragment };
  //   };
  // }
  @TypeGraphQL.Field(() => ObjectIdScalar, { nullable: false })
  @Property({ required: true })
  userId!: string;

  @TypeGraphQL.Field(() => ObjectIdScalar, { nullable: false })
  @Property({ required: true })
  listId!: string;

  @TypeGraphQL.Field(() => JSONResolver, { nullable: false })
  @Property({ required: true })
  data!: Record<string, unknown>;
}

const ListItemModel = getModelForClass<typeof ListItem>(ListItem);
export default ListItemModel;
