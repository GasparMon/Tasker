"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ChecklistSchema = new mongoose_1.Schema({
    task: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    status: {
        type: String,
        required: true,
        default: "Not-Done",
        enum: ["Not-Done", "Done"],
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("Checklist", ChecklistSchema);
