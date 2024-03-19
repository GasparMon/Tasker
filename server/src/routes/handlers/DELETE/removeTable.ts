import { Request, Response } from "express";
import User from "../../../database/models/User";
import Table from "../../../database/models/Table";
import Notification from "../../../database/models/Notification";

const removeTable = async (req: Request, res: Response) => {
  try {
    const { table_id } = req.body;

    await Table.deleteOne({ _id: table_id });

    await Notification.deleteMany({ board: table_id });

    const users = await User.find({ user_Tables: table_id });

    for (const user of users) {
      user.user_Tables = user.user_Tables.filter(
        (element) => !element.equals(table_id)
      );

      await user.save();
    }

    return res.status(200).json({ message: "Table removed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Error");
  }
};

export default removeTable;
