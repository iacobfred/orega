/* Do not edit this file. It was generated programmatically. */

import { List } from "@web/generated/interfaces/List";
import { ListDocument } from "@web/generated/models/List/document";
import { postCreate, postUpdate, preSave } from "@web/generated/models/List/hooks";
import { DEFAULT_SCHEMA_OPTIONS } from "@web/graphql/schema/types";
import mongoose, { ModifyResult, UpdateQuery } from "mongoose";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";

const listSchema = new mongoose.Schema<List>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    description: { type: String, required: false, default: null },
    fields: { type: Object, required: true },
    archivedAt: { type: Date, required: false, default: null },
  },
  DEFAULT_SCHEMA_OPTIONS
);

listSchema.plugin(mongooseLeanVirtuals);

listSchema.pre<ListDocument>("save", async function () {
  console.log("Saving List", this);
  await preSave(this);
});

listSchema.post<ListDocument>("save", async function (document) {
  console.log("Saved List", document);
  await postCreate(document);
});

listSchema.post<ListDocument>(
  "findOneAndUpdate",
  async function (_result: ListDocument | ModifyResult<ListDocument>) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const query = this as unknown as UpdateQuery<ListDocument>;
    const updatedFields = query.getUpdate().$set;
    if ((_result as ModifyResult<ListDocument>).value) {
      const result = _result as ModifyResult<ListDocument>;
      const list = result.value;
      if (list) {
        if (!result.lastErrorObject?.updatedExisting) {
          await postCreate(list);
        } else {
          await postUpdate(list, updatedFields);
        }
      }
    } else {
      const result = _result as ListDocument;
      await postUpdate(result, updatedFields);
    }
  }
);

export { listSchema };

// https://stackoverflow.com/questions/19051041/cannot-overwrite-model-once-compiled-mongoose
export const ListModel = mongoose.models.List || mongoose.model<List>("List", listSchema);

export default ListModel;
