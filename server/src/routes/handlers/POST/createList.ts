import List from "../../../database/models/List";
import { Request, Response } from "express";
import Table from "../../../database/models/Table";

const createList = async (req: Request, res: Response) => {
  try {
    const { name, table_id } = req.body;

    const userTable = await Table.findById(table_id).populate("table_Lists");

    if (!userTable) {
      return res.status(404).send("Table not found");
    }

    const existingList = userTable.table_Lists.find(listId => listId.equals(name));

    if (existingList) {
      const existingListData = await List.findById(existingList);
      return res.status(200).json(existingListData); 
    }

    const newList = new List({ name });
    await newList.save();

    userTable.table_Lists.push(newList._id);
    await userTable.save();

    return res.status(200).json(newList); 
  } catch (error) {
    return res.status(500).send("Error creating List.");
  }
}

export default createList;