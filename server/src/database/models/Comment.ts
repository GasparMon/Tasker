import mongoose, { Schema, model } from "mongoose";

const CommentSchema = new Schema(
  {
    body: {
      type: String,
      minlength: 5,
      maxlength: 50,
      required: true,
    },
    comment_user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Comment", CommentSchema);
