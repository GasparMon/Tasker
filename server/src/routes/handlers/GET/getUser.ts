import User from "../../../database/models/User";
import { Request, Response } from "express";

const getUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;

    const user = await User.findOne({ email });

    if (!user) {
      const newUser = new User({ email });
      await newUser.save();

      return res.status(200).json(newUser);
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).send("Internal Error");
  }
};

export default getUser;
