import mongoose, { Schema, model } from "mongoose";

const CommentSchema = new Schema(
  {
    body: {
      type: String,
      required: true,
    },
    date:{
      type: String,
      required: true,
      unique:false,
    },
    chatRoom:{
      type: Schema.Types.ObjectId,
      ref: "Table",
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
