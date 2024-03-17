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
const putNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { notification_id, sender_id, reciever_id, response } = req.body;
        const notification = yield Notification_1.default.findById(notification_id);
        if (notification) {
            notification.response = response;
            yield notification.save();
            if (response === "Accepted") {
                const response = yield new Notification_1.default({
                    type: "Response",
                    response: "Accepted",
                    sender: sender_id,
                    reciever: reciever_id,
                });
                yield response.save();
                return res.status(200).json(response);
            }
            else {
                const response = yield new Notification_1.default({
                    type: "Response",
                    response: "Rejected",
                    sender: sender_id,
                    reciever: reciever_id,
                });
                yield response.save();
                return res.status(200).json(response);
            }
        }
    }
    catch (error) {
        return res.status(500).send("Error to create List.");
    }
});
exports.default = putNotification;
