"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const DB_NAME = process.env.DB_ATLAS_NAME;
const DB_PASSWORD = process.env.DB_ATLAS_PASSWORD;
const uri = `mongodb+srv://${DB_NAME}:${DB_PASSWORD}@tasker.1iej4lo.mongodb.net/?retryWrites=true&w=majority&appName=tasker`;
mongoose_1.default.connect(uri)
    .then(() => {
    console.log(`DataBase is Connected`);
})
    .catch(error => {
    console.error(`Error to tried to connect to database`, error.message);
});
