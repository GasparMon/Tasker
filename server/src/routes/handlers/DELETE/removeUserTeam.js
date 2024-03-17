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
const Table_1 = __importDefault(require("../../../database/models/Table"));
const mongoose_1 = __importDefault(require("mongoose"));
const removeUserTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { table_id, user_id } = req.body;
        const table = yield Table_1.default.findById(table_id);
        if (table) {
            const userIdObjectId = new mongoose_1.default.Types.ObjectId(user_id);
            table.table_Team = table.table_Team.filter((id) => !id.equals(userIdObjectId));
            yield table.save();
            const infoTable = yield Table_1.default.findById(table_id).populate("table_Team");
            return res.status(200).json(infoTable === null || infoTable === void 0 ? void 0 : infoTable.table_Team);
        }
        return res.status(400).send("Table doesn't exist");
    }
    catch (error) {
        return res.status(500).send("Internal Error");
    }
});
exports.default = removeUserTeam;
