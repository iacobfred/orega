/* Do not edit this file. It was generated programmatically. */

import {
  IdentityCreationInput,
  IdentityUpdateInput,
  IdentityWhereInput,
  IdentityWhereUniqueInput,
} from "@/graphql/schema/generated/inputs/identity.inputs";
import * as TypeGraphQL from "type-graphql-v2-fork";

@TypeGraphQL.ArgsType()
export class IdentityCreationArgs {
  @TypeGraphQL.Field(() => IdentityCreationInput, { nullable: false })
  data!: IdentityCreationInput;
}

@TypeGraphQL.ArgsType()
export class IdentitiesCreationArgs {
  @TypeGraphQL.Field(() => IdentityCreationInput, { nullable: false })
  data!: IdentityCreationInput;
}

@TypeGraphQL.ArgsType()
export class DeleteIdentityArgs {
  @TypeGraphQL.Field(() => IdentityWhereUniqueInput, { nullable: false })
  where!: IdentityWhereUniqueInput;
}

@TypeGraphQL.ArgsType()
export class DeleteManyIdentityArgs {
  @TypeGraphQL.Field(() => IdentityWhereInput, { nullable: false })
  where!: IdentityWhereInput;
}

@TypeGraphQL.ArgsType()
export class FindUniqueIdentityArgs {
  @TypeGraphQL.Field(() => IdentityWhereUniqueInput, { nullable: false })
  where!: IdentityWhereUniqueInput;
}

@TypeGraphQL.ArgsType()
export class FindManyIdentityArgs {
  @TypeGraphQL.Field(() => IdentityWhereInput, { nullable: true })
  where?: IdentityWhereInput;
}

@TypeGraphQL.ArgsType()
export class IdentityUpdateArgs {
  @TypeGraphQL.Field(() => IdentityWhereUniqueInput, { nullable: false })
  where!: IdentityWhereUniqueInput;

  @TypeGraphQL.Field(() => IdentityUpdateInput, { nullable: false })
  data!: IdentityUpdateInput;
}

@TypeGraphQL.ArgsType()
export class ArgsForUpdatingManyIdentities {
  @TypeGraphQL.Field(() => IdentityWhereInput, { nullable: false })
  where!: IdentityWhereUniqueInput;

  @TypeGraphQL.Field(() => IdentityUpdateInput, { nullable: false })
  data!: IdentityUpdateInput;
}

@TypeGraphQL.ArgsType()
export class DistinctIdentitiesUpdateArgs {
  @TypeGraphQL.Field(() => [IdentityUpdateArgs], { nullable: false })
  data!: IdentityUpdateArgs[];
}

@TypeGraphQL.ArgsType()
export class IdentityUpsertionArgs {
  @TypeGraphQL.Field(() => IdentityWhereUniqueInput, { nullable: false })
  where!: IdentityWhereUniqueInput;

  @TypeGraphQL.Field(() => IdentityCreationInput, { nullable: false })
  data!: IdentityCreationInput;

  // @TypeGraphQL.Field(() => IdentityUpdateInput, { nullable: false })
  // update!: IdentityUpdateInput;
}
