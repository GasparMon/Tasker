import { Request, Response } from "express";
import Team from "../../../database/models/Team";
import User from "../../../database/models/User";

const addTeam = async (req: Request, res: Response) => {
  try {
    const { team_id, user_id } = req.body;

    const team = await Team.findById(team_id);

    if (!team) {
      return res.status(400).send("Team doesn't exist");
    }

    team.team_users.push(user_id);

    await team.save();

    const user = await User.findById(user_id);

    if (!user) {
      return res.status(400).send("User doesn't exist");
    }

    user.user_Teams.push(team_id);

    await user.save();

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).send("Internal Error");
  }
};

export default addTeam;
