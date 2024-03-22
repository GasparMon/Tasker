"use strict";
// import { Request, Response } from "express";
// import List from "../../../database/models/List";
// import mongoose from "mongoose";
// import Card from "../../../database/models/Card";
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
const Card_1 = __importDefault(require("../../../database/models/Card"));
const Table_1 = __importDefault(require("../../../database/models/Table"));
const putCardNewList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { card_id, current_List, new_List } = req.body;
        const board = yield Table_1.default.findById(current_List).populate("table_Lists");
        if (!board) {
            return res.status(404).send("Board not found");
        }
        const promises = board.table_Lists.map((element) => __awaiter(void 0, void 0, void 0, function* () {
            if (element._id.toString() === new_List) {
                const newlist = yield List_1.default.findById(new_List);
                if (!newlist) {
                    throw new Error("New list not found");
                }
                newlist.list_Cards.push(card_id);
                yield newlist.save();
                const newCard = yield Card_1.default.findById(card_id);
                if (!newCard) {
                    throw new Error("Card not found");
                }
                newCard.status = newlist.name;
                yield newCard.save();
                return newCard;
            }
            else {
                const newlist = yield List_1.default.findById(element._id);
                if (!newlist) {
                    throw new Error("List not found");
                }
                newlist.list_Cards = newlist.list_Cards.filter((id) => id.toString() !== card_id);
                yield newlist.save();
                return null;
            }
        }));
        const newCards = yield Promise.all(promises);
        return res.status(200).json(newCards.filter((card) => card !== null));
    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Internal Error");
    }
});
exports.default = putCardNewList;
