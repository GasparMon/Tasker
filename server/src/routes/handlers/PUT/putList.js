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
const putList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, list_id } = req.body;
        const list = yield List_1.default.findById(list_id);
        if (!list) {
            return res.status(404).send("List doesn't exist");
        }
        if (name) {
            list.name = name;
        }
        yield list.save();
        return res.status(200).json(list);
    }
    catch (error) {
        return res.status(500).send("Internal Error");
    }
});
exports.default = putList;
