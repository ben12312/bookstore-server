import { Request, Response } from 'express';
import UserRepository from '../repository/user.repository';

class UserController {
    static async getUsers(req: Request, res: Response) {
        try {
            let user = await UserRepository.getUsersRepo(req);
            if (user && user.rows) return res.json(user.rows[0])
            return res.json({})
        } catch (error) {
            console.log('get users', error);
        }
    }

    static async register(req: Request, res: Response) {
        const { login, password1 } = req.body;
        try {            
            if (login && password1) {
                await UserRepository.registerRepo(req);
                res.status(200).json({})
            } else {
                res.status(400).json({
                    message: `username/password required`
                })
            }
        } catch (error) {
            console.log('get users', error);
        }
    }

}

export default UserController;
