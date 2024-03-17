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
const User_1 = __importDefault(require("../../../database/models/User"));
const addUserPending = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, table_id } = req.body;
        let user = yield User_1.default.findOne({ email });
        if (!user) {
            user = new User_1.default({ email });
            yield user.save();
        }
        const table = yield Table_1.default.findById(table_id);
        if (!table) {
            return res.status(404).send("Table not found");
        }
        table.card_worker_pending.push(user._id);
        yield table.save();
        const populatedTable = yield Table_1.default.findById(table_id).populate("card_worker_pending");
        return res.status(200).json(populatedTable === null || populatedTable === void 0 ? void 0 : populatedTable.card_worker_pending);
    }
    catch (error) {
        console.error("Error adding user to team:", error);
        return res.status(500).send("Internal Error");
    }
});
exports.default = addUserPending;
