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
const List_1 = __importDefault(require("../../../database/models/List"));
const Table_1 = __importDefault(require("../../../database/models/Table"));
const createList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, table_id } = req.body;
        const userTable = yield Table_1.default.findById(table_id).populate("table_Lists");
        if (!userTable) {
            return res.status(404).send("Table not found");
        }
        const existingList = userTable.table_Lists.find(listId => listId.equals(name));
        if (existingList) {
            const existingListData = yield List_1.default.findById(existingList);
            return res.status(200).json(existingListData);
        }
        const newList = new List_1.default({ name });
        yield newList.save();
        userTable.table_Lists.push(newList._id);
        yield userTable.save();
        return res.status(200).json(newList);
    }
    catch (error) {
        return res.status(500).send("Error creating List.");
    }
});
exports.default = createList;
