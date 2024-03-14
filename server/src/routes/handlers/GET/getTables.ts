import User from "../../../database/models/User";
import { Request, Response } from "express";

const getTable = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
 
      const user = await User.findById(id).populate('user_Tables')
 
      return res.status(200).json(user?.user_Tables);
    } catch (error) {
      return res.status(500).send("Internal Error");
    }
  };
  

export default getTable;
