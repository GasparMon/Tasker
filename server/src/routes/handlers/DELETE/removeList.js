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
const List_1 = __importDefault(require("../../../database/models/List"));
const Card_1 = __importDefault(require("../../../database/models/Card"));
const removeList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { list_id, table_id } = req.body;
        const list = yield List_1.default.findById(list_id);
        yield Card_1.default.deleteMany({ _id: { $in: list === null || list === void 0 ? void 0 : list.list_Cards } });
        yield List_1.default.deleteOne({ _id: list_id });
        const table = yield Table_1.default.findById(table_id);
        if (!table) {
            return res.status(400).send("Table doesn't exist");
        }
        table.table_Lists = table.table_Lists.filter((element) => element.toString() !== list_id);
        yield table.save();
        return res.status(200).json(table);
    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Internal Error");
    }
});
exports.default = removeList;
