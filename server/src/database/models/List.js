"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ListSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: false,
        enum: ["ToDo", "In-Progress", "Waiting", "Finished", "Archived"],
    },
    list_Cards: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Card",
            required: true,
        },
    ],
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("List", ListSchema);
