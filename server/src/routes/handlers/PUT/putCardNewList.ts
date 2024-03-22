// import { Request, Response } from "express";
// import List from "../../../database/models/List";
// import mongoose from "mongoose";
// import Card from "../../../database/models/Card";

// const putCardNewList = async (req: Request, res: Response) => {
//   try {
//     const { card_id, current_List, new_List } = req.body;

//     const newList = await List.findById(new_List);
//     const currentList = await List.findById(current_List);

//     if (!newList || !currentList) {
//       return res.status(404).send("One or both lists not found");
//     }

//     if (newList.list_Cards.includes(card_id)) {
//       return res.status(400).send("Card already exists in the new list");
//     }

//     newList.list_Cards.push(card_id);
//     await newList.save();

//     const userIdObjectId = new mongoose.Types.ObjectId(card_id);
//     currentList.list_Cards = currentList.list_Cards.filter(
//       (id) => !id.equals(userIdObjectId)
//     );
//     await currentList.save();

//     const newCard = await Card.findById(card_id)

//     if(newCard){

//       newCard.status = newList.name

//       newCard.save()
//     }

//     return res.status(200).json(newCard);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send("Internal Error");
//   }
// };

// export default putCardNewList;

const putCardNewList = async (req: Request, res: Response) => {
  try {
    const { card_id, current_List, new_List } = req.body;

    const board = await Table.findById(current_List).populate("table_Lists");

    if (!board) {
      return res.status(404).send("Board not found");
    }

    const newListIndex = board.table_Lists.findIndex(
      (element) => element._id.toString() === new_List
    );

    if (newListIndex === -1) {
      return res.status(404).send("New list not found");
    }

    const newlist = await List.findById(new_List);

    if (!newlist) {
      return res.status(404).send("New list not found");
    }

    if (newlist.list_Cards.includes(card_id)) {
      return res.status(400).send("Card already exists in the new list");
    }

    const promises = board.table_Lists.map(async (element) => {
      if (element._id.toString() === new_List) {
        newlist.list_Cards.push(card_id);
        await newlist.save();

        const newCard = await Card.findById(card_id);

        if (!newCard) {
          throw new Error("Card not found");
        }

        newCard.status = newlist.name;
        await newCard.save();

        return newCard;
      } else {
        const list = await List.findById(element._id);

        if (!list) {
          throw new Error("List not found");
        }

        list.list_Cards = list.list_Cards.filter(
          (id) => id.toString() !== card_id
        );
        await list.save();

        return null;
      }
    });

    const newCards = await Promise.all(promises);

    return res.status(200).json(newCards.filter((card) => card !== null));
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Error");
  }
};

export default putCardNewList;
