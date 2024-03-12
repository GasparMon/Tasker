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
    },
    table_Lists: [
      {
        type: Schema.Types.ObjectId,
        ref: "List",
        required: false,
      },
    ],
    table_Team: {
      type: Schema.Types.ObjectId,
      ref: "Team",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Table", TableSchema);
