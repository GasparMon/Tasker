import express from 'express'
import createUser from './handlers/POST/createUser';
import createTable from './handlers/POST/createTable';
import createList from './handlers/POST/createList';
import createCard from './handlers/POST/createCard';
import createComment from './handlers/POST/createComment';
import createChecklist from './handlers/POST/createChecklist';
import createTeam from './handlers/POST/createTeam';
import getUser from './handlers/GET/getUser';
import getTable from './handlers/GET/getTables';
import getList from './handlers/GET/getList';
import getCard from './handlers/GET/getCard';
import getInfoCard from './handlers/GET/getInfoCard';
import getTeam from './handlers/GET/getTeam';
import putUser from './handlers/PUT/putUser';
import putTable from './handlers/PUT/putTable';
import putList from './handlers/PUT/putList';
import putTeam from './handlers/PUT/putTeam';
import putChecklist from './handlers/PUT/putChecklist';
import putComment from './handlers/PUT/putComment';
import putCard from './handlers/PUT/putCard';
import addTeam from './handlers/ADD/addTeam';
import addCardWorker from './handlers/ADD/addCardWorker';
import addTableTeam from './handlers/ADD/addTableTeam';
import removeTable from './handlers/DELETE/removeTable';
import getIdTable from './handlers/GET/getTable';
import getTableLists from './handlers/PUT/getTableLists';
import putCardNewList from './handlers/PUT/putCardNewList';
import removeCheck from './handlers/DELETE/revomeChecklist';
import removeCard from './handlers/DELETE/removeCard';
import addUserTeam from './handlers/PUT/addUserTeam';
import getTableTeam from './handlers/GET/getTeamTable';
import removeUserTeam from './handlers/DELETE/removeUserTeam';
import createNotification from './handlers/POST/createNotification';
import addUserPending from './handlers/PUT/addUserPending';
import putNotification from './handlers/PUT/putNotification';
import viewNotification from './handlers/PUT/viewNotification';



const routes = express.Router();

routes.post("/createUser", createUser);
routes.post("/createTable", createTable);
routes.post("/createList", createList);
routes.post("/createCard", createCard);
routes.post("/createComment", createComment);
routes.post("/createChecklist", createChecklist);
routes.post("/createTeam", createTeam);
routes.post("/creatNotification", createNotification)

routes.get("/getUser/:email", getUser);
routes.get("/getTable/:id", getTable);
routes.get("/getList/:id", getList);
routes.get("/getCard/:id", getCard);
routes.get("/getInfoCard/:id", getInfoCard);
routes.get("/getTeam/:id", getTeam);
routes.get("/getIdTable/:id", getIdTable);
routes.get("/getTableTeam/:id", getTableTeam)

routes.get("/getTableLists/:id", getTableLists);
routes.put("/putCardNewList", putCardNewList)

routes.put("/putUser", putUser);
routes.put("/putTable", putTable);
routes.put("/putList", putList);
routes.put("/putTeam", putTeam);
routes.put("/putCard", putCard);
routes.put("/putChecklist", putChecklist);
routes.put("/putComment", putComment);
routes.put("/addUser", addUserTeam);
routes.put("/addUserPending", addUserPending);
routes.put("/putNotification", putNotification);
routes.put("/viewNotifications", viewNotification);

routes.put("/addTeam", addTeam);
routes.put("/addCardWorker", addCardWorker);
routes.put("/addTableTeam", addTableTeam);

routes.delete("/removeTable", removeTable);
routes.delete("/removeCheck", removeCheck)
routes.delete("/removeCard", removeCard)
routes.delete("/removeUserTeam", removeUserTeam)

export default routes