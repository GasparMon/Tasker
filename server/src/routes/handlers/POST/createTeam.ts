import Team from "../../../database/models/Team";
import { Request, Response } from "express";
import User from "../../../database/models/User";

const createTeam = async (req: Request, res: Response) => {
  try {
    const { name, user_id } = req.body;

    const newTeam = await new Team({
      name,
      team_main: user_id,
      team_users:[user_id]
    });

    await newTeam.save();

    if (newTeam._id) {
      const userTeam = await User.findById(user_id);

      if (userTeam) {
        userTeam.user_Teams.push(newTeam._id);

        await userTeam.save();
      }
    }

    return res.status(200).json(newTeam);
  } catch (error) {
    return res.status(500).send("Internal Error");
  }
};

export default createTeam;
