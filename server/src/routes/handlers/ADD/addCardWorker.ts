import { Request, Response } from "express";
import Card from "../../../database/models/Card";

const addCardWorker = async (req: Request, res: Response) => {
  try {
    const { card_id, worker_id } = req.body;

    const card = await Card.findById(card_id);

    if (!card) {
      return res.status(400).send("Card doesn't exist");
    }

    if (card.card_worker.includes(worker_id)) {
        return res.status(400).send("Worker already assigned to this card");
      }

    card.card_worker.push(worker_id);

    await card.save();

    return res.status(200).json(card);
  } catch (error) {
    return res.status(500).send("Internal Error");
  }
};

export default addCardWorker;
