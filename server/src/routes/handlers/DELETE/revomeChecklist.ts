import { Request, Response } from "express";
import Checklist from "../../../database/models/Checklist";
import Card from "../../../database/models/Card";
import mongoose from "mongoose";

const removeCheck = async (req: Request, res: Response) => {
  try {
    const { card_id, check_id } = req.body;

    const card = await Card.findById(card_id);

    if (card) {
      const userIdObjectId = new mongoose.Types.ObjectId(check_id);

      card.card_checklist = card.card_checklist.filter(
        (id) => !id.equals(userIdObjectId)
      );

      await card.save();
    }

    const result = await Checklist.findByIdAndDelete(check_id);

    if (result) {
      return res.status(200).send(true);
    }

    return res.status(400).send(false);
  } catch (error) {
    return res.status(500).send("Internal Error");
  }
};

export default removeCheck;
