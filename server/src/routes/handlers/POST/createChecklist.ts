import Card from "../../../database/models/Card";
import Checklist from "../../../database/models/Checklist";
import { Request, Response } from "express";

const createChecklist = async (req: Request, res: Response) => {
  try {
    const { task, user_id, card_id } = req.body;

    const newChecklist = await new Checklist({
      task,
      user: user_id,
    });

    await newChecklist.save();

    if (newChecklist._id) {
      const listCheck = await Card.findById(card_id);

      if (listCheck) {
        listCheck.card_checklist.push(newChecklist._id);

        await listCheck.save();
      }
    }

    return res.status(200).json(newChecklist);
  } catch (error) {
    return res.status(500).send("Error to create Checklist");
  }
};

export default createChecklist;
