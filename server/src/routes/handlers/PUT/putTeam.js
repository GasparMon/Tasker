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
const Team_1 = __importDefault(require("../../../database/models/Team"));
const putTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, team_id } = req.body;
        const team = yield Team_1.default.findById(team_id);
        if (!team) {
            return res.status(404).send("Team doesn't exist");
        }
        if (name) {
            team.name = name;
        }
        yield team.save();
        return res.status(200).json(team);
    }
    catch (error) {
        return res.status(500).send("Internal Error");
    }
});
exports.default = putTeam;
