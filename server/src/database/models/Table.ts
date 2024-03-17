import mongoose, { Schema, model } from "mongoose";

const TableSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: false,
      minlength: 3,
      maxlength: 30,
    },

    image: {
      type: String,
      unique: false,
      required: false,
      enum:["modelone", "modeltwo", "modelthree", "modelfour", "modelfive"]
    },
    table_Lists: [
      {
        type: Schema.Types.ObjectId,
        ref: "List",
        required: false,
      },
    ],
    table_Team: [{
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    }],
    card_worker_pending: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model("Table", TableSchema);
