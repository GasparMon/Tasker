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
const removeTable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { table_id, user_id } = req.body;
        yield Table_1.default.deleteOne({ _id: table_id });
        const user = yield User_1.default.findById(user_id);
        if (!user) {
            return res.status(400).send("User doesn't exist");
        }
        user.user_Tables = user.user_Tables.filter((element) => element.toString() != table_id);
        yield user.save();
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(500).send("Internal Error");
    }
});
exports.default = removeTable;
