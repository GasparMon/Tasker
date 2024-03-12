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
const Comment_1 = __importDefault(require("../../../database/models/Comment"));
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body, user_id, card_id } = req.body;
        const newComment = yield new Comment_1.default({
            body,
            comment_user: user_id,
        });
        yield newComment.save();
        if (newComment._id) {
            const cardComment = yield Card_1.default.findById(card_id);
            if (cardComment) {
                cardComment.card_comment.push(newComment._id);
                yield cardComment.save();
            }
        }
        return res.status(200).json(newComment);
    }
    catch (error) {
        return res.status(500).send("Error to create Comment");
    }
});
exports.default = createComment;
