import mongoose, { Schema, model } from "mongoose";

const TableSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
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
        required: true,
      },
    ],
    table_Team: {
      type: Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Table", TableSchema);
