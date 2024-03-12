import { Request, Response } from "express";
import List from "../../../database/models/List";

const putList = async (req: Request, res: Response) => {
  try {
    const { name, list_id } = req.body;

    const list = await List.findById(list_id);

    if (!list) {
      return res.status(404).send("List doesn't exist");
    }

    if (name) {
      list.name = name;
    }

    await list.save();

    return res.status(200).json(list);
  } catch (error) {
    return res.status(500).send("Internal Error");
  }
};

export default putList;
