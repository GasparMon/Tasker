
import { Request, Response } from "express";
import Notification from "../../../database/models/Notification";

const createNotification = async (req: Request, res: Response) => {
  try {
    const { board_id, sender_id, reciever_id } = req.body;

    const newNotification = await new Notification({
      board: board_id,
      sender: sender_id,
      reciever: reciever_id,
      status: "Pending",
    });

    await newNotification.save();

    return res.status(200).json(newNotification);
  } catch (error) {
    return res.status(500).send("Error to create List.");
  }
};

export default createNotification;
