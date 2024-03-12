import { Request, Response } from "express";
import Card from "../../../database/models/Card";

const getInfoCard = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const cardInfo = await Card.findById(id)
      .populate("card_user")
      .populate("card_worker")
      .populate("card_comment")
      .populate("card_checklist");

    return res.status(200).json(cardInfo);
  } catch (error) {
    return res.status(500).send("Internal Error");
  }
};

export default getInfoCard;
