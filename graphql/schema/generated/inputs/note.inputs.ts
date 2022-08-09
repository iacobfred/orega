/* Do not edit this file. It was generated programmatically. */

import * as Scalars from "@/graphql/schema/scalars";
import * as Types from "@/graphql/schema/types";
import { ID, WhereInput, WhereUniqueInput } from "@/graphql/schema/types";
import * as TypeGraphQL from "type-graphql-v2-fork";

@TypeGraphQL.InputType()
export class NoteCreationInput {
  @TypeGraphQL.Field(() => Scalars.ObjectId, { nullable: false })
  userId!: Types.ID;

  @TypeGraphQL.Field(() => Scalars.ObjectId, { nullable: false })
  notebookId!: Types.ID;

  @TypeGraphQL.Field(() => Scalars.String, { nullable: false })
  title!: Types.String;

  @TypeGraphQL.Field(() => Scalars.String, { nullable: true })
  body?: Types.String | null | undefined;

  @TypeGraphQL.Field(() => Scalars.Boolean, { nullable: true })
  public?: Types.Boolean | null | undefined;

  @TypeGraphQL.Field(() => Scalars.DateTime, { nullable: true })
  archivedAt?: Types.DateTime | null | undefined;
}

@TypeGraphQL.InputType()
export class NoteUpdateInput {
  @TypeGraphQL.Field(() => Scalars.ObjectId, { nullable: true })
  userId?: Types.ID | undefined;

  @TypeGraphQL.Field(() => Scalars.ObjectId, { nullable: true })
  notebookId?: Types.ID | undefined;

  @TypeGraphQL.Field(() => Scalars.String, { nullable: true })
  title?: Types.String | undefined;

  @TypeGraphQL.Field(() => Scalars.String, { nullable: true })
  body?: Types.String | null | undefined;

  @TypeGraphQL.Field(() => Scalars.Boolean, { nullable: true })
  public?: Types.Boolean | null | undefined;

  @TypeGraphQL.Field(() => Scalars.DateTime, { nullable: true })
  archivedAt?: Types.DateTime | null | undefined;
}

@TypeGraphQL.InputType()
export class NoteWhereInput extends WhereInput {
  @TypeGraphQL.Field(() => Scalars.ObjectIdScalar, { nullable: true })
  id?: ID | undefined;

  @TypeGraphQL.Field(() => Scalars.ObjectId, { nullable: true })
  userId?: Types.ID | null | undefined;

  @TypeGraphQL.Field(() => Scalars.ObjectId, { nullable: true })
  notebookId?: Types.ID | null | undefined;

  @TypeGraphQL.Field(() => Scalars.String, { nullable: true })
  title?: Types.String | null | undefined;

  @TypeGraphQL.Field(() => Scalars.String, { nullable: true })
  body?: Types.String | undefined;

  @TypeGraphQL.Field(() => Scalars.Boolean, { nullable: true })
  public?: Types.Boolean | undefined;
}

@TypeGraphQL.InputType()
export class NoteWhereUniqueInput extends WhereUniqueInput {
  // @TypeGraphQL.Field(() => Scalars.ObjectIdScalar, { nullable: false })
  // id!: ID;
}
