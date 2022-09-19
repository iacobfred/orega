/* Do not edit this file. It was generated programmatically. */

import mongoose from "mongoose";

// https://mongoosejs.com/docs/typescript.html

export interface Shelving {
  _id: mongoose.Types.ObjectId;
  bookId: mongoose.Types.ObjectId;
  shelfId: mongoose.Types.ObjectId;
  position: number;
  rationale?: string | null;
  createdAt: Date;
  updatedAt: Date;
  archivedAt?: Date | null;
}

export default Shelving;
