/* Do not edit this file. It was generated programmatically. */

import * as Scalars from "@/graphql/schema/scalars";
import * as Types from "@/graphql/schema/types";
import { ID, WhereInput, WhereUniqueInput } from "@/graphql/schema/types";
import * as TypeGraphQL from "type-graphql-v2-fork";

@TypeGraphQL.InputType()
export class UserCreationInput {
  @TypeGraphQL.Field(() => Scalars.String, { nullable: true })
  name?: Types.String | null | undefined;

  @TypeGraphQL.Field(() => Scalars.String, { nullable: false })
  email!: Types.String;

  @TypeGraphQL.Field(() => Scalars.Boolean, { nullable: true })
  emailVerified?: Types.Boolean | null | undefined;

  @TypeGraphQL.Field(() => Scalars.String, { nullable: true })
  image?: Types.String | null | undefined;

  @TypeGraphQL.Field(() => Scalars.Boolean, { nullable: false })
  isAdmin!: Types.Boolean;

  @TypeGraphQL.Field(() => Scalars.JSON, { nullable: false })
  settings!: Types.UserSettings;

  @TypeGraphQL.Field(() => Scalars.DateTime, { nullable: true })
  lastLogin?: Types.DateTime | null | undefined;

  @TypeGraphQL.Field(() => Scalars.DateTime, { nullable: true })
  archivedAt?: Types.DateTime | null | undefined;
}

@TypeGraphQL.InputType()
export class UserUpdateInput {
  @TypeGraphQL.Field(() => Scalars.String, { nullable: true })
  name?: Types.String | null | undefined;

  @TypeGraphQL.Field(() => Scalars.String, { nullable: true })
  email?: Types.String | undefined;

  @TypeGraphQL.Field(() => Scalars.Boolean, { nullable: true })
  emailVerified?: Types.Boolean | null | undefined;

  @TypeGraphQL.Field(() => Scalars.String, { nullable: true })
  image?: Types.String | null | undefined;

  @TypeGraphQL.Field(() => Scalars.Boolean, { nullable: true })
  isAdmin?: Types.Boolean | undefined;

  @TypeGraphQL.Field(() => Scalars.JSON, { nullable: true })
  settings?: Types.UserSettings | undefined;

  @TypeGraphQL.Field(() => Scalars.DateTime, { nullable: true })
  lastLogin?: Types.DateTime | null | undefined;

  @TypeGraphQL.Field(() => Scalars.DateTime, { nullable: true })
  archivedAt?: Types.DateTime | null | undefined;
}

@TypeGraphQL.InputType()
export class UserWhereInput extends WhereInput {
  @TypeGraphQL.Field(() => Scalars.ObjectIdScalar, { nullable: true })
  id?: ID | undefined;

  @TypeGraphQL.Field(() => Scalars.String, { nullable: true })
  name?: Types.String | undefined;

  @TypeGraphQL.Field(() => Scalars.String, { nullable: true })
  email?: Types.String | null | undefined;

  @TypeGraphQL.Field(() => Scalars.Boolean, { nullable: true })
  emailVerified?: Types.Boolean | undefined;

  @TypeGraphQL.Field(() => Scalars.String, { nullable: true })
  image?: Types.String | undefined;

  @TypeGraphQL.Field(() => Scalars.Boolean, { nullable: true })
  isAdmin?: Types.Boolean | null | undefined;

  @TypeGraphQL.Field(() => Scalars.JSON, { nullable: true })
  settings?: Types.UserSettings | null | undefined;

  @TypeGraphQL.Field(() => Scalars.DateTime, { nullable: true })
  lastLogin?: Types.DateTime | undefined;
}

@TypeGraphQL.InputType()
export class UserWhereUniqueInput extends WhereUniqueInput {
  @TypeGraphQL.Field(() => Scalars.String, { nullable: true })
  email?: Types.String | null | undefined;
}
