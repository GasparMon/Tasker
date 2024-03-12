import { Request, Response } from 'express';
import User from '../../database/models/User';

const createUser = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(200).json(existingUser);
        }

        const newUser = new User({ email });
        await newUser.save();

        return res.status(200).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).send('Error creating user');
    }
};

export default createUser;
