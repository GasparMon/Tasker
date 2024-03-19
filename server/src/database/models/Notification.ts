import mongoose, { Schema, model } from "mongoose";

const NotificationSchema = new Schema({
  status: {
    type: String,
    require: false,
    unique: false,
    enum: ["Pending", "Accepted", "Rejected"],
  },

  type:{
    type: String,
    require: true,
    unique: false,
    enum: ["Invite", "Response"],
    default: "Invite"
  },

  response:{
    type: String,
    require: false,
    unique: false,
    enum: ["Accepted", "Rejected"],
  },

  view: {
    type: Boolean,
    require: true,
    unique: false,
    default: false,
  },

  board: {
    type: Schema.Types.ObjectId,
    ref: "Table",
    required: true,
  },

  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  reciever: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
},
{
  timestamps: true,
});

export default model("Notification", NotificationSchema);
