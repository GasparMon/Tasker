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
const addCardWorker = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { card_id, worker_id } = req.body;
        const card = yield Card_1.default.findById(card_id);
        if (!card) {
            return res.status(400).send("Card doesn't exist");
        }
        if (card.card_worker.includes(worker_id)) {
            return res.status(400).send("Worker already assigned to this card");
        }
        card.card_worker.push(worker_id);
        yield card.save();
        return res.status(200).json(card);
    }
    catch (error) {
        return res.status(500).send("Internal Error");
    }
});
exports.default = addCardWorker;
