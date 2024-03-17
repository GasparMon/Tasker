import { Request, Response } from "express";
import Table from "../../../database/models/Table";

const getTableTeam = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const table = await Table.findById(id)
      .populate("table_Team");

    return res.status(200).json(table?.table_Team);
  } catch (error) {
    return res.status(500).send("Internal Error");
  }
};

export default getTableTeam;