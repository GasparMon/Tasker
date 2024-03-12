import { Request, Response } from "express";
import Table from "../../../database/models/Table";
import User from "../../../database/models/User";

const createTable = async (req: Request, res: Response) => {
  try {
    const { name, user_id } = req.body;

    const newTable = new Table({ name });

    await newTable.save();

    if (newTable.name) {
      const userTable = await User.findById(user_id);

      if (userTable) {
        userTable.user_Tables.push(newTable._id);
        await userTable.save();
      }
    }

    return res.status(200).send(newTable);
  } catch (error) {
    return res.status(500).send("Error to create Table.");
  }
};

export default createTable;
