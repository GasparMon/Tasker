import { Request, Response } from "express";
import Table from "../../../database/models/Table";

const getList = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const table_list = await Table.findById(id).populate("table_Lists");

    return res.status(200).json(table_list);
  } catch (error) {
    return res.status(500).send("Internal Error");
  }
};

export default getList;
