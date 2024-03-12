import Card from "../../../database/models/Card";
import List from "../../../database/models/List";
import { Request, Response } from "express";

const createCard = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      label,
      dueDate,
      type,
      status,
      user_id,
      worker_id,
      list_id,
    } = req.body;

    const newCard = await new Card({
      title,
      description,
      label,
      dueDate,
      type,
      status,
      card_user: user_id,
    });

    if (worker_id) {
      newCard.card_worker.push(worker_id);
    }

    await newCard.save();

    if (newCard._id) {
      const listCard = await List.findById(list_id);

      if (listCard) {
        listCard.list_Cards.push(newCard._id);

        await listCard.save();
      }
    }

    return res.status(200).json(newCard);
  } catch (error) {
    return res.status(500).send("Error to Create the Card");
  }
};

export default createCard;
