import { Request, Response } from "express";
import List from "../../../database/models/List";

const getCard = async( req: Request, res: Response) => {

    try {
        const { id } = req.params;
  

        const card_List = await List.findById(id).populate({path: "list_Cards", populate:{
          path: "card_checklist"
        }})

        return res.status(200).json(card_List?.list_Cards)

      } catch (error) {
        return res.status(500).send("Internal Error");
      }
}

export default getCard;