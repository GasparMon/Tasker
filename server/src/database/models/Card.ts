import mongoose, { Schema, model } from "mongoose";

const CardSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: false,
      minlength: 3,
      maxlength: 40,
    },

    description: {
      type: String,
      required: false,
      unique: false,
      minlength: 3,
      maxlength: 100,
    },

    label: {
      type: String,
      required: false,
      unique: false,
      enum: ["Urgent", "High priority", "Critical"],
    },

    dueDate: {
      type: String,
      required: false,
      unique: false,
    },

    type: {
      type: String,
      required: false,
      unique: false,
      enum: ["Task", "Idea", "Bug", "Story"],
    },

    status: {
      type: String,
      required: false,
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

    checklist: {
      type: String,
      required: false,
      unique: false,
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
