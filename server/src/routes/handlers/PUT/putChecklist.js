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
const Checklist_1 = __importDefault(require("../../../database/models/Checklist"));
const putChecklist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { task, status, checklist_id } = req.body;
        const checklist = yield Checklist_1.default.findById(checklist_id);
        if (!checklist) {
            return res.status(404).send("Checklist doesn't exist");
        }
        if (task) {
            checklist.task = task;
        }
        if (status) {
            checklist.status = status;
        }
        yield checklist.save();
        return res.status(200).json(checklist);
    }
    catch (error) {
        return res.status(500).send("Internal Error");
    }
});
exports.default = putChecklist;
