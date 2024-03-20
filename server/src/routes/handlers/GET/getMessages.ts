import { Request, Response } from "express";
import Comment from "../../../database/models/Comment";

const getMessages = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const messages = await Comment.find({ chatRoom: id }).populate(
      "chatRoom"
    ).populate("comment_user");

    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).send("Internal Error");
  }
};

export default getMessages;
