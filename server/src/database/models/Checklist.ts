import mongoose, { Schema, model } from "mongoose";

const ChecklistSchema = new Schema(
  {
    task: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    status: {
      type: String,
      required: true,
      default: "Not-Done",
      enum: ["Not-Done", "Done"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Checklist", ChecklistSchema);
