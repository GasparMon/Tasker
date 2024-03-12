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
const Checklist_1 = __importDefault(require("../../../database/models/Checklist"));
const createChecklist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { task, user_id, card_id } = req.body;
        const newChecklist = yield new Checklist_1.default({
            task,
            user: user_id,
        });
        yield newChecklist.save();
        if (newChecklist._id) {
            const listCheck = yield Card_1.default.findById(card_id);
            if (listCheck) {
                listCheck.card_checklist.push(newChecklist._id);
                yield listCheck.save();
            }
        }
        return res.status(200).json(newChecklist);
    }
    catch (error) {
        return res.status(500).send("Error to create Checklist");
    }
});
exports.default = createChecklist;
