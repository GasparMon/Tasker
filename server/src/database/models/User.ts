import mongoose, { Schema, model } from "mongoose";
import validator from "validator";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: `Please, Insert a valid Email`,
      },
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
        ref: "Table",
        require: true,
      },
    ],
    user_Teams: [
      {
        type: Schema.Types.ObjectId,
        ref: "Team",
        require: true,
      },
    ],
  },

  {
    timestamps: true,
  }
);

export default model("User", UserSchema);
