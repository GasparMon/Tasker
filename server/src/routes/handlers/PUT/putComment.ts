import { Request, Response } from "express";
import Comment from "../../../database/models/Comment";

const putComment = async (req: Request, res: Response) => {
  try {
    const { body, comment_id } = req.body;

    const comment = await Comment.findById(comment_id);

    if (!comment) {
      return res.status(404).send("Comment doesn't exist");
    }

    if (body) {
      comment.body = body;
    }

    await comment.save();

    return res.status(200).json(comment);
  } catch (error) {
    return res.status(500).send("Internal Error");
  }
};

export default putComment;
