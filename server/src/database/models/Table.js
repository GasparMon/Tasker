"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TableSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: false,
        minlength: 3,
        maxlength: 30,
    },
    image: {
        type: String,
        unique: false,
        required: false,
        enum: ["modelone", "modeltwo", "modelthree", "modelfour", "modelfive"]
    },
    table_Lists: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "List",
            required: false,
        },
    ],
    table_Team: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Team",
            required: false,
        }],
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("Table", TableSchema);
