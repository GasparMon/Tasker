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
const Notification_1 = __importDefault(require("../../../database/models/Notification"));
const User_1 = __importDefault(require("../../../database/models/User"));
const createNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { board_id, sender_id, email } = req.body;
        const user = yield User_1.default.findOne({ email });
        if (user) {
            const newNotification = yield new Notification_1.default({
                board: board_id,
                sender: sender_id,
                reciever: user._id,
                status: "Pending",
            });
            yield newNotification.save();
            return res.status(200).json(newNotification);
        }
    }
    catch (error) {
        return res.status(500).send("Error to create List.");
    }
});
exports.default = createNotification;
