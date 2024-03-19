import Table from "../../../database/models/Table";
import User from "../../../database/models/User";
import { Request, Response } from "express";

const addUserTeam = async (req: Request, res: Response) => {
  try {
    const { email, table_id } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ email });
      await user.save();
    }

    const table = await Table.findById(table_id);
    if (!table) {
      return res.status(404).send("Table not found");
    }

    table.table_Team.push(user._id);
    await table.save();

    const populatedTable = await Table.findById(table_id).populate(
      "table_Team"
    );
    return res.status(200).json(populatedTable?.table_Team);
  } catch (error) {
    console.error("Error adding user to team:", error);
    return res.status(500).send("Internal Error");
  }
};

export default addUserTeam;
