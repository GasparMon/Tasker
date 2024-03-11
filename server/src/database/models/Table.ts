import mongoose, { Schema, model } from "mongoose";

const Table = new Schema({
  name: {
    type: String,
    require: true,
    unique: true,
    minlength: 3,
    maxlength: 30,
  },

  image: {
    type: String,
    unique: false,
    required: false,
  }
},
{
  timestamps: true,
});
