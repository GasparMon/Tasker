"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../../database/models/User"));
const Table_1 = __importDefault(require("../../../database/models/Table"));
const Notification_1 = __importDefault(require("../../../database/models/Notification"));
const removeTable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { table_id } = req.body;
        yield Table_1.default.deleteOne({ _id: table_id });
        yield Notification_1.default.deleteMany({ board: table_id });
        const users = yield User_1.default.find({ user_Tables: table_id });
        for (const user of users) {
            user.user_Tables = user.user_Tables.filter((element) => !element.equals(table_id));
            yield user.save();
        }
        return res.status(200).json({ message: "Table removed successfully" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Internal Error");
    }
});
exports.default = removeTable;
