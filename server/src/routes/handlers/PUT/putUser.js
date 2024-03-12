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
const User_1 = __importDefault(require("../../../database/models/User"));
const putUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, lastname, image, email, user_id } = req.body;
        const user = yield User_1.default.findById(user_id);
        if (!user) {
            return res.status(404).send("User doesn't exist");
        }
        if (name) {
            user.name = name;
        }
        if (lastname) {
            user.lastname = lastname;
        }
        if (email) {
            user.email = email;
        }
        yield user.save();
        return res.status(200).json(user);
    }
    catch (error) {
        console.error("Error al actualizar usuario:", error);
        return res.status(500).send("Error interno al actualizar usuario");
    }
});
exports.default = putUser;
