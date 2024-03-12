import { Request, Response } from "express";
import Table from "../../../database/models/Table";

const putTable = async (req: Request, res: Response) => {
  try {
    const { name, image, table_id } = req.body;

    const table = await Table.findById(table_id);

    if (!table) {
      return res.status(404).send("Table doesn't exist");
    }

    if (name) {
      table.name = name;
    }

    await table.save();

    return res.status(200).json(table);
  } catch (error) {
    return res.status(500).send("Internal Error");
  }
};

export default putTable;
