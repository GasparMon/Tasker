import { Request, Response } from "express";
import List from "../../../database/models/List";
import mongoose from "mongoose";

const putCardNewList = async (req: Request, res: Response) => {
  try {
    const { card_id, current_List, new_List } = req.body;

    // Verificar si las listas existen
    const newList = await List.findById(new_List);
    const currentList = await List.findById(current_List);

    if (!newList || !currentList) {
      return res.status(404).send("One or both lists not found");
    }

    // Agregar la tarjeta a la nueva lista
    newList.list_Cards.push(card_id);
    await newList.save();

    // Eliminar la tarjeta de la lista actual
    const userIdObjectId = new mongoose.Types.ObjectId(card_id);
    currentList.list_Cards = currentList.list_Cards.filter(
      (id) => !id.equals(userIdObjectId)
    );
    await currentList.save();

    return res.status(200).json(newList);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Error");
  }
};

export default putCardNewList;
