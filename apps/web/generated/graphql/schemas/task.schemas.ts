/* Do not edit this file. It was generated programmatically. */

import { TaskCreationInput, TaskUpdateInput } from "@web/generated/graphql/inputs/task.inputs";
import { date, InferType, number, object, Schema, string } from "yup";

export const taskCreationInputSchema: Schema<TaskCreationInput> = object({
  title: string().required(),
  description: string().nullable().optional(),
  plannedStartDate: date().nullable().optional(),
  dueDate: date().nullable().optional(),
  userId: string().required(),
  parentId: string().nullable().optional(),
  habitId: string().nullable().optional(),
  expectedDuration: number()
    .nullable()
    .optional()
    .default(() => {
      return 30;
    }),
  rank: number().required(),
  completedAt: date().nullable().optional(),
  archivedAt: date().nullable().optional(),
});

export const taskUpdateInputSchema: Schema<TaskUpdateInput> = object({
  title: string().nonNullable().optional(),
  description: string().nullable().optional(),
  plannedStartDate: date().nullable().optional(),
  dueDate: date().nullable().optional(),
  userId: string().nonNullable().optional(),
  parentId: string().nullable().optional(),
  habitId: string().nullable().optional(),
  expectedDuration: number().nullable().optional(),
  rank: number().nonNullable().optional(),
  completedAt: date().nullable().optional(),
  archivedAt: date().nullable().optional(),
});

export type TaskCreationInputSchemaType = InferType<typeof taskCreationInputSchema>;
export type TaskUpdateInputSchemaType = InferType<typeof taskUpdateInputSchema>;
