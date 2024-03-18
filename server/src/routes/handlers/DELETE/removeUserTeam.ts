import { Request, Response } from "express";
import Table from "../../../database/models/Table";
import User from "../../../database/models/User";
import mongoose from "mongoose";

const removeUserTeam = async (req: Request, res: Response) => {
  try {
    const { table_id, user_id } = req.body;

    const table= await Table.findById(table_id);

    if(table) {

        const userIdObjectId = new mongoose.Types.ObjectId(user_id);

        table.table_Team = table.table_Team.filter ((id) => !id.equals(userIdObjectId))

        table.card_worker_pending = table.card_worker_pending.filter ((id) => !id.equals(userIdObjectId))

        await table.save();

        const infoTable = await Table.findById(table_id).populate("table_Team").populate("card_worker_pending")

        return res.status(200).json(infoTable)
    }

    return res.status(400).send("Table doesn't exist")

  } catch (error) {
    return res.status(500).send("Internal Error");
  }
};

export default removeUserTeam;
