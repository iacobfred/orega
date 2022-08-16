/* Do not edit this file. It was generated programmatically. */

import { GoalCreationInput } from "@/graphql/generated/inputs/goal.inputs";
import { date, InferType, object, SchemaOf, string } from "yup";

export const goalCreationInputSchema: SchemaOf<GoalCreationInput> = object({
  habitId: string().nullable(),
  parentId: string().nullable(),
  description: string().required(),
  archivedAt: date().nullable(),
});

export type GoalCreationInputSchemaType = InferType<typeof goalCreationInputSchema>;
