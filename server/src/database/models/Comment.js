"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CommentSchema = new mongoose_1.Schema({
    body: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true,
    },
    comment_user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("Comment", CommentSchema);
