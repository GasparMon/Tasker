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
const createTable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, user_id } = req.body;
        const newTable = new Table_1.default({ name });
        yield newTable.save();
        if (newTable.name) {
            const userTable = yield User_1.default.findById(user_id);
            if (userTable) {
                userTable.user_Tables.push(newTable._id);
                yield userTable.save();
            }
        }
        return res.status(200).send(newTable);
    }
    catch (error) {
        return res.status(500).send("Error to create Table.");
    }
});
exports.default = createTable;
