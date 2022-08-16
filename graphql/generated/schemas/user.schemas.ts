/* Do not edit this file. It was generated programmatically. */

import { UserCreationInput } from "@/graphql/generated/inputs/user.inputs";
import { accountCreationInputSchema } from "@/graphql/generated/schemas/account.schemas";
import { calendarCreationInputSchema } from "@/graphql/generated/schemas/calendar.schemas";
import { calendarEventCreationInputSchema } from "@/graphql/generated/schemas/calendarEvent.schemas";
import { goalCreationInputSchema } from "@/graphql/generated/schemas/goal.schemas";
import { habitCreationInputSchema } from "@/graphql/generated/schemas/habit.schemas";
import { mantraCreationInputSchema } from "@/graphql/generated/schemas/mantra.schemas";
import { notebookCreationInputSchema } from "@/graphql/generated/schemas/notebook.schemas";
import { taskCreationInputSchema } from "@/graphql/generated/schemas/task.schemas";
import { array, bool, date, InferType, object, SchemaOf, string } from "yup";

export const userCreationInputSchema: SchemaOf<UserCreationInput> = object({
  name: string().nullable(),
  email: string().required(),
  emailVerified: bool().nullable(),
  image: string().nullable(),
  isAdmin: bool().required(),
  settings: object(),
  lastLogin: date().nullable(),
  accounts: array().of(accountCreationInputSchema.required()),
  calendars: array().of(calendarCreationInputSchema.required()),
  calendarEvents: array().of(calendarEventCreationInputSchema.required()),
  goals: array().of(goalCreationInputSchema.required()),
  habits: array().of(habitCreationInputSchema.required()),
  mantras: array().of(mantraCreationInputSchema.required()),
  notebooks: array().of(notebookCreationInputSchema.required()),
  tasks: array().of(taskCreationInputSchema.required()),
  archivedAt: date().nullable(),
});

export type UserCreationInputSchemaType = InferType<typeof userCreationInputSchema>;
