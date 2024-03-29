"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CardSchema = new mongoose_1.Schema({
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
        enum: ["Urgent", "Priority", "Critical"],
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
            "InProgress",
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
        minlength: 3,
        maxlength: 100,
    },
    card_user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    card_worker: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    ],
    card_comment: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Comment",
        },
    ],
    card_checklist: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Checklist",
            required: true,
        },
    ],
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("Card", CardSchema);
