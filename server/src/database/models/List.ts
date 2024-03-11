import mongoose, { Schema, model } from "mongoose";

const ListSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: false,
      enum: ["ToDo", "In-Progress", "Waiting", "Finished", "Archived"],
    },
    list_Cards: [
      {
        type: Schema.Types.ObjectId,
        ref: "Card",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model("List", ListSchema);
