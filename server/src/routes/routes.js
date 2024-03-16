"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createUser_1 = __importDefault(require("./handlers/POST/createUser"));
const createTable_1 = __importDefault(require("./handlers/POST/createTable"));
const createList_1 = __importDefault(require("./handlers/POST/createList"));
const createCard_1 = __importDefault(require("./handlers/POST/createCard"));
const createComment_1 = __importDefault(require("./handlers/POST/createComment"));
const createChecklist_1 = __importDefault(require("./handlers/POST/createChecklist"));
const createTeam_1 = __importDefault(require("./handlers/POST/createTeam"));
const getUser_1 = __importDefault(require("./handlers/GET/getUser"));
const getTables_1 = __importDefault(require("./handlers/GET/getTables"));
const getList_1 = __importDefault(require("./handlers/GET/getList"));
const getCard_1 = __importDefault(require("./handlers/GET/getCard"));
const getInfoCard_1 = __importDefault(require("./handlers/GET/getInfoCard"));
const getTeam_1 = __importDefault(require("./handlers/GET/getTeam"));
const putUser_1 = __importDefault(require("./handlers/PUT/putUser"));
const putTable_1 = __importDefault(require("./handlers/PUT/putTable"));
const putList_1 = __importDefault(require("./handlers/PUT/putList"));
const putTeam_1 = __importDefault(require("./handlers/PUT/putTeam"));
const putChecklist_1 = __importDefault(require("./handlers/PUT/putChecklist"));
const putComment_1 = __importDefault(require("./handlers/PUT/putComment"));
const putCard_1 = __importDefault(require("./handlers/PUT/putCard"));
const addTeam_1 = __importDefault(require("./handlers/ADD/addTeam"));
const addCardWorker_1 = __importDefault(require("./handlers/ADD/addCardWorker"));
const addTableTeam_1 = __importDefault(require("./handlers/ADD/addTableTeam"));
const removeTable_1 = __importDefault(require("./handlers/DELETE/removeTable"));
const getTable_1 = __importDefault(require("./handlers/GET/getTable"));
const getTableLists_1 = __importDefault(require("./handlers/PUT/getTableLists"));
const putCardNewList_1 = __importDefault(require("./handlers/PUT/putCardNewList"));
const revomeChecklist_1 = __importDefault(require("./handlers/DELETE/revomeChecklist"));
const removeCard_1 = __importDefault(require("./handlers/DELETE/removeCard"));
const routes = express_1.default.Router();
routes.post("/createUser", createUser_1.default);
routes.post("/createTable", createTable_1.default);
routes.post("/createList", createList_1.default);
routes.post("/createCard", createCard_1.default);
routes.post("/createComment", createComment_1.default);
routes.post("/createChecklist", createChecklist_1.default);
routes.post("/createTeam", createTeam_1.default);
routes.get("/getUser/:email", getUser_1.default);
routes.get("/getTable/:id", getTables_1.default);
routes.get("/getList/:id", getList_1.default);
routes.get("/getCard/:id", getCard_1.default);
routes.get("/getInfoCard/:id", getInfoCard_1.default);
routes.get("/getTeam/:id", getTeam_1.default);
routes.get("/getIdTable/:id", getTable_1.default);
routes.get("/getTableLists/:id", getTableLists_1.default);
routes.put("/putCardNewList", putCardNewList_1.default);
routes.put("/putUser", putUser_1.default);
routes.put("/putTable", putTable_1.default);
routes.put("/putList", putList_1.default);
routes.put("/putTeam", putTeam_1.default);
routes.put("/putCard", putCard_1.default);
routes.put("/putChecklist", putChecklist_1.default);
routes.put("/putComment", putComment_1.default);
routes.put("/addTeam", addTeam_1.default);
routes.put("/addCardWorker", addCardWorker_1.default);
routes.put("/addTableTeam", addTableTeam_1.default);
routes.delete("/removeTable", removeTable_1.default);
routes.delete("/removeCheck", revomeChecklist_1.default);
routes.delete("/removeCard", removeCard_1.default);
exports.default = routes;
