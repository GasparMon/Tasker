"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: (value) => validator_1.default.isEmail(value),
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
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Table",
            require: true,
        },
    ],
    user_Teams: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Team",
            require: true,
        },
    ],
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("User", UserSchema);
