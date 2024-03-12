import List from "../../../database/models/List";
import { Request, Response } from "express";
import Table from "../../../database/models/Table";

const createList = async (req: Request, res: Response) => {
  try {
    const { name, table_id } = req.body;

    const newList = await new List({ name });

    newList.save();

    if (newList._id) {
      const userTable = await Table.findById(table_id);

      if (userTable) {
        userTable.table_Lists.push(newList._id);

        userTable.save();
      }
    }

    return res.status(200).json(newList);
  } catch (error) {
    return res.status(500).send("Error to create List.");
  }
};

export default createList;
