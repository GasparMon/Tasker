import { Request, Response } from "express";
import Notification from "../../../database/models/Notification";

const getNotifications = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const notifications = await Notification.find({ reciever: id })
      .populate("board")
      .populate("sender");

    return res.status(200).json(notifications);
  } catch (error) {
    return res.status(500).send("Internal Error");
  }
};

export default getNotifications;
