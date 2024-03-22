import { Request, Response } from "express";
import Table from "../../../database/models/Table";

const getIdTable = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const table = await Table.findById(id)
      .populate({path: "table_Lists", populate: {
        path: 'list_Cards'
      }})
      .populate("table_Team");

    return res.status(200).json(table);
  } catch (error) {
    return res.status(500).send("Internal Error");
  }
};

export default getIdTable;