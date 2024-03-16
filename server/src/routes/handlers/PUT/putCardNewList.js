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
const mongoose_1 = __importDefault(require("mongoose"));
const putCardNewList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { card_id, current_List, new_List } = req.body;
        // Verificar si las listas existen
        const newList = yield List_1.default.findById(new_List);
        const currentList = yield List_1.default.findById(current_List);
        if (!newList || !currentList) {
            return res.status(404).send("One or both lists not found");
        }
        // Agregar la tarjeta a la nueva lista
        newList.list_Cards.push(card_id);
        yield newList.save();
        // Eliminar la tarjeta de la lista actual
        const userIdObjectId = new mongoose_1.default.Types.ObjectId(card_id);
        currentList.list_Cards = currentList.list_Cards.filter((id) => !id.equals(userIdObjectId));
        yield currentList.save();
        return res.status(200).json(newList);
    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Internal Error");
    }
});
exports.default = putCardNewList;
