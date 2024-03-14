import { Request, Response } from "express";
import Table from "../../../database/models/Table";

const getTable = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const table = await Table.findById(id)
      .populate("table_Lists")
      .populate("table_Team");

    return res.status(200).json(table);
  } catch (error) {
    return res.status(500).send("Internal Error");
  }
};

export default getTable;