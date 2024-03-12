import { Request, Response } from "express";
import User from "../../../database/models/User";
import Table from "../../../database/models/Table";

const removeTable = async (req: Request, res: Response) => {
  try {
    const { table_id, user_id } = req.body;

    await Table.deleteOne({ _id: table_id });

    const user = await User.findById(user_id);

    if (!user) {
      return res.status(400).send("User doesn't exist");
    }

    user.user_Tables = user.user_Tables.filter(
      (element) => element.toString() != table_id
    );

    await user.save();

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).send("Internal Error");
  }
};

export default removeTable;
