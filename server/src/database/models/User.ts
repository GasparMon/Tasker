import mongoose, { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    name: {
      type: String,
      required: false,
      minlength: 3,
      maxlength: 30,
    },

    lastname: {
      type: String,
      required: false,
      minlength: 3,
      maxlength: 30,
    },

    image: {
      type: String,
      unique: false,
      required: false,
    },
    user_Tables: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tables",
        require: true,
      },
    ],
    user_Teams: [
      {
        type: Schema.Types.ObjectId,
        ref: "Teams",
        require: true,
      },
    ],
  },

  {
    timestamps: true,
  }
);

export default model("User", UserSchema);
