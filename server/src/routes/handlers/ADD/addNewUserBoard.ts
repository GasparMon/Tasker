import { Request, Response } from "express";
import Table from "../../../database/models/Table";
import User from "../../../database/models/User";

const addNewUserBoard = async (req: Request, res: Response) => {

    try{

        const {table_id, user_id} = req.body;

        const user = await User.findById(user_id);

        if(!user){

            return res.status(400).send("User doesn't exist");
        }

        user.user_Tables.push(table_id)

       await user.save()

        return res.status(200).json(user);

    }catch(error){

        return res.status(500).send("Internal Error")
    }
}

export default addNewUserBoard; 