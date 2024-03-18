import { Request, Response } from "express";
import Notification from "../../../database/models/Notification";

const getNotifications = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const notification = await Notification.find({ reciever: id }).populate("board").populate("sender");

    return res.status(200).json(notification);
  } catch (error) {
    return res.status(500).send("Internal Error");
  }
};

export default getNotifications;
