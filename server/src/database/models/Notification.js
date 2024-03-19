"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const NotificationSchema = new mongoose_1.Schema({
    status: {
        type: String,
        require: false,
        unique: false,
        enum: ["Pending", "Accepted", "Rejected"],
    },
    type: {
        type: String,
        require: true,
        unique: false,
        enum: ["Invite", "Response"],
        default: "Invite"
    },
    response: {
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
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Table",
        required: true,
    },
    sender: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    reciever: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("Notification", NotificationSchema);
