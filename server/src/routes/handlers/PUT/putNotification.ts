import { Request, Response } from "express";
import NotificationModel from "../../../database/models/Notification";
import Notification from "../../../database/models/Notification";

const putNotification = async (req: Request, res: Response) => {
  try {
    const { notification_id, sender_id, reciever_id, response } = req.body;

    const notification = await NotificationModel.findById(notification_id);

    if (notification) {
      notification.response = response;
      notification.status = response;

      await notification.save();

      if (
        notification.status === "Accepted" ||
        notification.status === "Rejected"
      ) {
        const newNotification = await new Notification({
          type: "Response",
          response: notification.status,
          sender: reciever_id,
          reciever: sender_id,
          board: notification.board,
        });

        await newNotification.save();

        return res.status(200).json(newNotification);
      }
    }

    return res.status(404).json({ error: "Notification not found" });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error to update Notification.");
  }
};

export default putNotification;
