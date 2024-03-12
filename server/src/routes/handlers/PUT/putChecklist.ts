import { Request, Response } from "express";
import Checklist from "../../../database/models/Checklist";

const putChecklist = async (req: Request, res: Response) => {
  try {
    const { task, status, checklist_id } = req.body;

    const checklist = await Checklist.findById(checklist_id);

    if (!checklist) {
      return res.status(404).send("Checklist doesn't exist");
    }

    if (task) {
      checklist.task = task;
    }

    if (status) {
      checklist.status = status;
    }

    await checklist.save();

    return res.status(200).json(checklist);
  } catch (error) {
    return res.status(500).send("Internal Error");
  }
};

export default putChecklist;
