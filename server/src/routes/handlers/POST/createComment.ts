import Card from "../../../database/models/Card";
import Comment from "../../../database/models/Comment";
import { Request, Response } from "express";

const createComment = async (req: Request, res: Response) => {
  try {
    const { body, user_id, card_id } = req.body;

    const newComment = await new Comment({
      body,
      comment_user: user_id,
    });

    await newComment.save();

    if (newComment._id) {
      const cardComment = await Card.findById(card_id);

      if (cardComment) {
        cardComment.card_comment.push(newComment._id);

        await cardComment.save();
      }
    }

    return res.status(200).json(newComment);
  } catch (error) {
    return res.status(500).send("Error to create Comment");
  }
};

export default createComment;
