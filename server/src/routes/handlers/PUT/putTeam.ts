import { Request, Response } from "express";
import Team from "../../../database/models/Team";

const putTeam = async (req: Request, res: Response) => {
  try {
    const { name, team_id } = req.body;

    const team = await Team.findById(team_id);

    if (!team) {
      return res.status(404).send("Team doesn't exist");
    }

    if (name) {
      team.name = name;
    }

    await team.save();

    return res.status(200).json(team);
  } catch (error) {
    return res.status(500).send("Internal Error");
  }
};

export default putTeam;
