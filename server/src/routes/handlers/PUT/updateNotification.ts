import { Request, Response } from "express";
import Notification from "../../../database/models/Notification";

const updateNotifications = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

  
    await Notification.updateMany({ reciever: id }, { $set: { view: true } });


    return res.status(200).json(id);
  } catch (error) {
    return res.status(500).send("Internal Error");
  }
};

export default updateNotifications;