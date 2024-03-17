import { Request, Response } from "express";
import Notification from "../../../database/models/Notification";

const viewNotification = async (req: Request, res: Response) => {
  try {
    const { notification_id } = req.body;

    const notification = await Notification.findById(notification_id);

    if (notification) {
      notification.view = true;

      await notification.save();

      return res.status(200).json(notification);
    }
  } catch (error) {
    return res.status(500).send("Error to create List.");
  }
};

export default viewNotification;
