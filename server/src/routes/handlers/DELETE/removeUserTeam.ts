import { Request, Response } from "express";
import Table from "../../../database/models/Table";
import User from "../../../database/models/User";
import mongoose from "mongoose";
import Notification from "../../../database/models/Notification";

const removeUserTeam = async (req: Request, res: Response) => {
  try {
    const { table_id, user_id } = req.body;

    const table = await Table.findById(table_id);

    if (table) {
      const userIdObjectId = new mongoose.Types.ObjectId(user_id);

      table.table_Team = table.table_Team.filter(
        (id) => !id.equals(userIdObjectId)
      );

      table.card_worker_pending = table.card_worker_pending.filter(
        (id) => !id.equals(userIdObjectId)
      );

      await table.save();

      const user = await User.findById(user_id);

      if (user) {
        const tableObjectId = new mongoose.Types.ObjectId(table_id);

        user.user_Tables = user.user_Tables.filter(
          (id) => !id.equals(tableObjectId)
        );

        await user.save();

        await Notification.deleteMany({
          type: "Invite",
          status: "Pending",
          board: table_id,
          reciever: user_id,
        });
      }

      const infoTable = await Table.findById(table_id)
        .populate("table_Team")
        .populate("card_worker_pending");

      return res.status(200).json(infoTable);
    }

    return res.status(400).send("Table doesn't exist");
  } catch (error) {
    return res.status(500).send("Internal Error");
  }
};

export default removeUserTeam;
