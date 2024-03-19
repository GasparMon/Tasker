import { Request, Response } from "express";
import User from "../../../database/models/User";
import Table from "../../../database/models/Table";
import List from "../../../database/models/List";
import Card from "../../../database/models/Card";

const removeList = async (req: Request, res: Response) => {
  try {
    const { list_id, table_id } = req.body;

    const list = await List.findById(list_id)


    await Card.deleteMany({ _id: { $in: list?.list_Cards } });


    await List.deleteOne({ _id: list_id });


    const table = await Table.findById(table_id);

    if (!table) {
      return res.status(400).send("Table doesn't exist");
    }


    table.table_Lists = table.table_Lists.filter((element) => element.toString() !== list_id);

   
    await table.save();

    return res.status(200).json(table);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Error");
  }
};

export default removeList;
