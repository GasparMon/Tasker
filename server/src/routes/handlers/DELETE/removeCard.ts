import { Request, Response } from "express";
import mongoose from "mongoose";
import List from "../../../database/models/List";
import Card from "../../../database/models/Card";

const removeCard = async (req: Request, res: Response) => {
  try {
    const { card_id, list_id } = req.body;

    const list = await List.findById(list_id);

    if (list) {
      const userIdObjectId = new mongoose.Types.ObjectId(card_id);

      list.list_Cards = list.list_Cards.filter(
        (id) => !id.equals(userIdObjectId)
      );

      await list.save();
    }

    const result = await Card.findByIdAndDelete(card_id);

    if (result) {
      return res.status(200).send(true);
    }

    return res.status(400).send(false);
  } catch (error) {
    return res.status(500).send("Internal Error");
  }
};

export default removeCard;
