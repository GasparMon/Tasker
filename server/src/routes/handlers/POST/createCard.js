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
const Card_1 = __importDefault(require("../../../database/models/Card"));
const List_1 = __importDefault(require("../../../database/models/List"));
const createCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, label, dueDate, type, status, user_id, worker_id, list_id, } = req.body;
        const newCard = yield new Card_1.default({
            title,
            description,
            label,
            dueDate,
            type,
            status,
            card_user: user_id,
        });
        if (worker_id) {
            newCard.card_worker.push(worker_id);
        }
        yield newCard.save();
        if (newCard._id) {
            const listCard = yield List_1.default.findById(list_id);
            if (listCard) {
                listCard.list_Cards.push(newCard._id);
                yield listCard.save();
            }
        }
        return res.status(200).json(newCard);
    }
    catch (error) {
        return res.status(500).send("Error to Create the Card");
    }
});
exports.default = createCard;
