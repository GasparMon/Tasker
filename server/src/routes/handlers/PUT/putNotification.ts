import { Request, Response } from "express";
import Notification from "../../../database/models/Notification";

const putNotification = async (req: Request, res: Response) => {
  try {
    const { notification_id, sender_id, reciever_id, response } = req.body;

    const notification = await Notification.findById(notification_id);

    if (notification) {
      notification.response = response;

      await notification.save();

      if (response === "Accepted") {
        const response = await new Notification({
          type: "Response",
          response: "Accepted",
          sender: sender_id,
          reciever: reciever_id,
        });

        await response.save();

        return res.status(200).json(response);
      } else {
        const response = await new Notification({
          type: "Response",
          response: "Rejected",
          sender: sender_id,
          reciever: reciever_id,
        });

        await response.save();

        return res.status(200).json(response);
      }
    }
  } catch (error) {
    return res.status(500).send("Error to create List.");
  }
};

export default putNotification;
