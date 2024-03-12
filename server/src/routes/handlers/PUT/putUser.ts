import { Request, Response } from "express";
import User from "../../../database/models/User";

const putUser = async (req: Request, res: Response) => {
    try {
        const { name, lastname, image, email, user_id } = req.body;

        const user = await User.findById(user_id);

        if (!user) {
            return res.status(404).send("User doesn't exist");
        }

        if (name) {
            user.name = name;
        }

        if (lastname) {
            user.lastname = lastname;
        }

        if (email) {
            user.email = email;
        }

        await user.save();

        return res.status(200).json(user);
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        return res.status(500).send("Error interno al actualizar usuario");
    }
};

export default putUser;
