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
const Notification_2 = __importDefault(require("../../../database/models/Notification"));
const putNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { notification_id, sender_id, reciever_id, response } = req.body;
        const notification = yield Notification_1.default.findById(notification_id);
        if (notification) {
            notification.response = response;
            notification.status = response;
            yield notification.save();
            if (notification.status === "Accepted" ||
                notification.status === "Rejected") {
                const newNotification = yield new Notification_2.default({
                    type: "Response",
                    response: notification.status,
                    sender: reciever_id,
                    reciever: sender_id,
                    board: notification.board,
                });
                yield newNotification.save();
                return res.status(200).json(newNotification);
            }
        }
        return res.status(404).json({ error: "Notification not found" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Error to update Notification.");
    }
});
exports.default = putNotification;
