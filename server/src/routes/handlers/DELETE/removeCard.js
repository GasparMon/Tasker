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
const mongoose_1 = __importDefault(require("mongoose"));
const List_1 = __importDefault(require("../../../database/models/List"));
const Card_1 = __importDefault(require("../../../database/models/Card"));
const removeCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { card_id, list_id } = req.body;
        const list = yield List_1.default.findById(list_id);
        if (list) {
            const userIdObjectId = new mongoose_1.default.Types.ObjectId(card_id);
            list.list_Cards = list.list_Cards.filter((id) => !id.equals(userIdObjectId));
            yield list.save();
        }
        const result = yield Card_1.default.findByIdAndDelete(card_id);
        if (result) {
            return res.status(200).send(true);
        }
        return res.status(400).send(false);
    }
    catch (error) {
        return res.status(500).send("Internal Error");
    }
});
exports.default = removeCard;
