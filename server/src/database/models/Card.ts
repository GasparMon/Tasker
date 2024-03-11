import mongoose, { Schema, model } from "mongoose";

const CardSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: false,
      minlength: 3,
      maxlength: 20,
    },

    description: {
      type: String,
      required: true,
      unique: false,
      minlength: 3,
      maxlength: 50,
    },

    label: {
      type: String,
      required: true,
      unique: false,
    },

    dueDate: {
      type: String,
      required: true,
      unique: false,
    },

    type: {
      type: String,
      required: true,
      unique: false,
      enum: ["Task", "Idea", "Bug", "Story"],
    },

    status: {
      type: String,
      required: true,
      unique: false,
      enum: [
        "ToDo",
        "In-Progress",
        "Waiting",
        "Finished",
        "Archived",
        "Cancelled",
      ],
    },
    card_user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    card_worker: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    card_comment: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    card_checklist: [
      {
        type: Schema.Types.ObjectId,
        ref: "Checklist",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model("Card", CardSchema);
