/* Do not edit this file. It was generated programmatically. */

import * as Scalars from "@/graphql/schema/scalars";
import * as Types from "@/graphql/schema/types";
import { ID, WhereInput, WhereUniqueInput } from "@/graphql/schema/types";
import * as TypeGraphQL from "type-graphql-v2-fork";

@TypeGraphQL.InputType()
export class BookCreateInput {
  @TypeGraphQL.Field(() => Scalars.String, { nullable: true })
  isbn?: Types.String | null | undefined;

  @TypeGraphQL.Field(() => Scalars.String, { nullable: true })
  isbn13?: Types.String | null | undefined;

  @TypeGraphQL.Field(() => Scalars.String, { nullable: false })
  title!: Types.String;

  @TypeGraphQL.Field(() => Scalars.String, { nullable: false })
  slug!: Types.String;

  @TypeGraphQL.Field(() => Scalars.String, { nullable: true })
  description?: Types.String | null | undefined;

  @TypeGraphQL.Field(() => Scalars.StringArray, { nullable: false })
  authorNames!: Types.String[];

  @TypeGraphQL.Field(() => Scalars.StringArray, { nullable: false })
  authorNamesLf!: Types.String[];

  @TypeGraphQL.Field(() => Scalars.Int, { nullable: true })
  publicationYear?: Types.Number | null | undefined;

  @TypeGraphQL.Field(() => Scalars.Int, { nullable: true })
  originalPublicationYear?: Types.Number | null | undefined;

  @TypeGraphQL.Field(() => Scalars.DateTime, { nullable: true })
  archivedAt?: Types.DateTime | null | undefined;
}

@TypeGraphQL.InputType()
export class BookUpdateInput {
  @TypeGraphQL.Field(() => Scalars.String, { nullable: true })
  isbn?: Types.String | null | undefined;

  @TypeGraphQL.Field(() => Scalars.String, { nullable: true })
  isbn13?: Types.String | null | undefined;

  @TypeGraphQL.Field(() => Scalars.String, { nullable: true })
  title?: Types.String | undefined;

  @TypeGraphQL.Field(() => Scalars.String, { nullable: true })
  slug?: Types.String | undefined;

  @TypeGraphQL.Field(() => Scalars.String, { nullable: true })
  description?: Types.String | null | undefined;

  @TypeGraphQL.Field(() => Scalars.StringArray, { nullable: true })
  authorNames?: Types.String[] | undefined;

  @TypeGraphQL.Field(() => Scalars.StringArray, { nullable: true })
  authorNamesLf?: Types.String[] | undefined;

  @TypeGraphQL.Field(() => Scalars.Int, { nullable: true })
  publicationYear?: Types.Number | null | undefined;

  @TypeGraphQL.Field(() => Scalars.Int, { nullable: true })
  originalPublicationYear?: Types.Number | null | undefined;

  @TypeGraphQL.Field(() => Scalars.DateTime, { nullable: true })
  archivedAt?: Types.DateTime | null | undefined;
}

@TypeGraphQL.InputType()
export class BookWhereInput extends WhereInput {
  @TypeGraphQL.Field(() => Scalars.ObjectIdScalar, { nullable: true })
  id?: ID | undefined;

  @TypeGraphQL.Field(() => Scalars.String, { nullable: true })
  isbn?: Types.String | undefined;

  @TypeGraphQL.Field(() => Scalars.String, { nullable: true })
  isbn13?: Types.String | undefined;

  @TypeGraphQL.Field(() => Scalars.String, { nullable: true })
  title?: Types.String | null | undefined;

  @TypeGraphQL.Field(() => Scalars.String, { nullable: true })
  slug?: Types.String | null | undefined;

  @TypeGraphQL.Field(() => Scalars.String, { nullable: true })
  description?: Types.String | undefined;

  @TypeGraphQL.Field(() => Scalars.StringArray, { nullable: true })
  authorNames?: Types.String[] | null | undefined;

  @TypeGraphQL.Field(() => Scalars.StringArray, { nullable: true })
  authorNamesLf?: Types.String[] | null | undefined;

  @TypeGraphQL.Field(() => Scalars.Int, { nullable: true })
  publicationYear?: Types.Number | undefined;

  @TypeGraphQL.Field(() => Scalars.Int, { nullable: true })
  originalPublicationYear?: Types.Number | undefined;
}

@TypeGraphQL.InputType()
export class BookWhereUniqueInput extends WhereUniqueInput {
  // @TypeGraphQL.Field(() => Scalars.ObjectIdScalar, { nullable: false })
  // id!: ID;
}
