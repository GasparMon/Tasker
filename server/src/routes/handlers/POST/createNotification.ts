import { Request, Response } from "express";
import Notification from "../../../database/models/Notification";
import User from "../../../database/models/User";

const createNotification = async (req: Request, res: Response) => {
  try {
    const { board_id, sender_id, email } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      const newNotification = await new Notification({
        board: board_id,
        sender: sender_id,
        reciever: user._id,
        status: "Pending",
      });

      await newNotification.save();

      return res.status(200).json(newNotification);
    }

  } catch (error) {
    return res.status(500).send("Error to create List.");
  }
};

export default createNotification;
