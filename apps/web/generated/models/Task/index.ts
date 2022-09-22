/* Do not edit this file. It was generated programmatically. */

import { Task } from "@web/generated/interfaces/Task";
import { postCreate, postUpdate, preSave } from "@web/generated/models/Task/hooks";
import { DEFAULT_SCHEMA_OPTIONS } from "@web/graphql/schema/types";
import mongoose, { HydratedDocument, ModifyResult, UpdateQuery } from "mongoose";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";

const taskSchema = new mongoose.Schema<Task>(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: false,
      default: null,
    },
    plannedStartDate: {
      type: Date,
      required: false,
      default: null,
    },
    dueDate: {
      type: Date,
      required: false,
      default: null,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: false,
      default: null,
    },
    habitId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Habit",
      required: false,
      default: null,
    },
    expectedDuration: {
      type: Number,
      required: false,
      default: 30,
    },
    rank: {
      type: Number,
      required: true,
    },
    completedAt: {
      type: Date,
      required: false,
      default: null,
    },
    archivedAt: { type: Date, required: false, default: null },
  },
  DEFAULT_SCHEMA_OPTIONS
);

taskSchema.plugin(mongooseLeanVirtuals);

taskSchema.pre<HydratedDocument<Task>>("save", async function () {
  return Promise.resolve(preSave(this));
});

taskSchema.post<Task>("save", async function (document) {
  await postCreate(document);
});

taskSchema.post<Task>("findOneAndUpdate", async function (_result: Task | ModifyResult<Task>) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const query = this as unknown as UpdateQuery<Task>;
  const updatedFields = query.getUpdate().$set;
  if ((_result as ModifyResult<Task>).value) {
    const result = _result as ModifyResult<Task>;
    const task = result.value;
    if (task) {
      if (!result.lastErrorObject?.updatedExisting) {
        await postCreate(task);
      } else {
        await postUpdate(task, updatedFields);
      }
    }
  } else {
    const result = _result as Task;
    await postUpdate(result, updatedFields);
  }
});

export { taskSchema };

// https://stackoverflow.com/questions/19051041/cannot-overwrite-model-once-compiled-mongoose
export const TaskModel: mongoose.Model<Task> =
  mongoose.models.Task || mongoose.model<Task>("Task", taskSchema);

export default TaskModel;
