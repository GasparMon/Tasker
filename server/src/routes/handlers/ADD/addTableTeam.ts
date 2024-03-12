import { Request, Response } from "express";
import Table from "../../../database/models/Table";

const addTableTeam = async (req: Request, res: Response) => {

    try{

        const {table_id, user_id} = req.body;

        const table = await Table.findById(table_id);

        if(!table){

            return res.status(400).send("Table doesn't exist");
        }

        table.table_Team.push(user_id);

        table.save();

        return res.status(200).json(table);

    }catch(error){

        return res.status(500).send("Internal Error")
    }
}

export default addTableTeam;