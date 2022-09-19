/* Do not edit this file. It was generated programmatically. */

import { DateTimeScalar, JSONResolver, ObjectIdScalar } from "@web/graphql/schema/scalars";
import { ID, WhereInput, WhereUniqueInput } from "@web/graphql/schema/types";
import { Field, InputType } from "type-graphql-v2-fork";

@InputType()
export class ListCreationInput {
  // Note: `nullable` in TypeGraphQL actually refers to whether the input is optional.
  // https://typegraphql.com/docs/0.17.2/types-and-fields.html
  @Field(() => ObjectIdScalar, { nullable: false })
  userId!: string;

  // Note: `nullable` in TypeGraphQL actually refers to whether the input is optional.
  // https://typegraphql.com/docs/0.17.2/types-and-fields.html
  @Field(() => String, { nullable: false })
  name!: string;

  // Note: `nullable` in TypeGraphQL actually refers to whether the input is optional.
  // https://typegraphql.com/docs/0.17.2/types-and-fields.html
  @Field(() => String, { nullable: true })
  description?: string | null | undefined;

  // Note: `nullable` in TypeGraphQL actually refers to whether the input is optional.
  // https://typegraphql.com/docs/0.17.2/types-and-fields.html
  @Field(() => JSONResolver, { nullable: false })
  fields!: Record<string, unknown>;

  @Field(() => DateTimeScalar, { nullable: true })
  archivedAt?: Date | null | undefined;
}

@InputType()
export class ListUpdateInput {
  @Field(() => ObjectIdScalar, { nullable: true })
  userId?: string | undefined;

  @Field(() => String, { nullable: true })
  name?: string | undefined;

  @Field(() => String, { nullable: true })
  description?: string | null | undefined;

  @Field(() => JSONResolver, { nullable: true })
  fields?: Record<string, unknown> | undefined;

  @Field(() => DateTimeScalar, { nullable: true })
  archivedAt?: Date | null | undefined;
}

@InputType()
export class ListWhereInput extends WhereInput {
  @Field(() => ObjectIdScalar, { nullable: true })
  id?: ID | undefined;

  @Field(() => ObjectIdScalar, { nullable: true })
  userId?: string | null | undefined;

  @Field(() => String, { nullable: true })
  name?: string | null | undefined;

  @Field(() => String, { nullable: true })
  description?: string | undefined;

  @Field(() => JSONResolver, { nullable: true })
  fields?: Record<string, unknown> | null | undefined;
}

@InputType()
export class ListWhereUniqueInput extends WhereUniqueInput {
  // @Field(() => ObjectIdScalar, { nullable: false })
  // id!: ID;
}
