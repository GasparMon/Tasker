import { Request, Response } from "express";
import Team from "../../../database/models/Team";

const getTeam = async (req: Request, res: Response) => {

    try{

        const {id} = req.params;

        const userTeams = await Team.find({ team_users: id }).populate("team_users").populate("team_main");

        return res.status(200).json(userTeams);


    }catch(error){

        return res.status(500).send("Internal Error")
    }
}

export default getTeam