"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TeamSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: false,
        minlength: 3,
        maxlength: 25,
    },
    team_main: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    team_users: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User",
            required: false,
        },
    ],
});
exports.default = (0, mongoose_1.model)("Team", TeamSchema);
