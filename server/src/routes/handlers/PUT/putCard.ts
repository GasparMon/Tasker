import { Request, Response } from "express";
import Card from "../../../database/models/Card";

const putCard = async (req: Request, res: Response) => {
  try {
    const { title, description, label, dueDate, type, status, card_id } =
      req.body;

    const card = await Card.findById(card_id);

    if (!card) {
      return res.status(404).send("Card doesn't exist");
    }

    if (title) {
      card.title = title;
    }

    if (description) {
      card.description = description;
    }

    if (label) {
      card.label = label;
    }

    if (dueDate) {
      card.dueDate = dueDate;
    }

    if (type) {
      card.type = type;
    }

    if (status) {
      card.status = status;
    }

    await card.save();

    return res.status(200).json(card);
  } catch (error) {
    return res.status(500).send("Internal Error");
  }
};

export default putCard;
