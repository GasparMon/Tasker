import { Request, Response } from "express";
import Table from "../../../database/models/Table";

const getTableLists = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const table = await Table.findById(id).populate("table_Lists");
    
    return res.status(200).json(table?.table_Lists);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Error");
  }
};

export default getTableLists;
