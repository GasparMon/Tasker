import mongoose, { Schema, model } from "mongoose";

const TeamSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: false,
    minlength: 3,
    maxlength: 25,
  },
  team_main:{
    type: Schema.Types.ObjectId,
    ref:"User",
    required: true,
  },
  team_users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  ],
});

export default model("Team", TeamSchema);
