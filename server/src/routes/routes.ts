import express from 'express'
import createUser from './handlers/createUser';

const routes = express.Router();

routes.post("/createUser", createUser);

export default routes