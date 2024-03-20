import { Request, Response } from "express";
import Comment from "../../../database/models/Comment";

const createMessage = async (req: Request, res: Response) => {
  try {
    const { body, date, table_id, user_id } = req.body;

    const message = await new Comment({
      body,
      date,
      chatRoom: table_id,
      comment_user: user_id,
    });

    await message.save();

    return res.status(200).json(message);
  } catch (error) {
    console.error("Error creating message:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default createMessage;
