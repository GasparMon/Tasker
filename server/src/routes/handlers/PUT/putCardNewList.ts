import { Request, Response } from "express";
import List from "../../../database/models/List";
import mongoose from "mongoose";
import Card from "../../../database/models/Card";

const putCardNewList = async (req: Request, res: Response) => {
  try {
    const { card_id, current_List, new_List } = req.body;

    const newList = await List.findById(new_List);
    const currentList = await List.findById(current_List);

    if (!newList || !currentList) {
      return res.status(404).send("One or both lists not found");
    }

    if (newList.list_Cards.includes(card_id)) {
      return res.status(400).send("Card already exists in the new list");
    }

    newList.list_Cards.push(card_id);
    await newList.save();

    const userIdObjectId = new mongoose.Types.ObjectId(card_id);
    currentList.list_Cards = currentList.list_Cards.filter(
      (id) => !id.equals(userIdObjectId)
    );
    await currentList.save();

    const newCard = await Card.findById(card_id)

    if(newCard){

      newCard.status = newList.name

      newCard.save()
    }

    return res.status(200).json(newCard);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Error");
  }
};

export default putCardNewList;
