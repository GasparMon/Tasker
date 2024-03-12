"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
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
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Tables",
            require: true,
        },
    ],
    user_Teams: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Teams",
            require: true,
        },
    ],
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("User", UserSchema);
