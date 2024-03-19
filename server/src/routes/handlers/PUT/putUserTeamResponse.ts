import { Request, Response } from "express";
import Table from "../../../database/models/Table";
import mongoose from "mongoose";

const putUserTeamResponse = async (req: Request, res: Response) => {
  try {
    const { board_id, user_id, response } = req.body;

    const board = await Table.findById(board_id);

    if (board) {
      const userIdObjectId = new mongoose.Types.ObjectId(user_id);

      board.card_worker_pending = board.card_worker_pending.filter(
        (id) => !id.equals(userIdObjectId)
      );

      if (response === "Accepted") {
        board.table_Team.push(user_id);

        await board.save();

        return res.status(200).json(board);
      }

      await board.save();

      return res.status(200).json(board);
    }
  } catch (error) {
    return res.status(500).send("Error to create List.");
  }
};

export default putUserTeamResponse;
