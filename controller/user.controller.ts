import { Request, Response } from 'express';
import pool from '../entity/config';

const userData = [
    {
        id: 1,
        login: 'Admin',
        password: 'Admin',
        isAdmin: true
    },
    {
        id: 2,
        login: 'User',
        password: 'User',
        isAdmin: false
    },
]

class UserController {
    static async getUsers(req: Request, res: Response) {
        const { username } = req.query;
        let query = `SELECT * FROM users`
        try {
            if (username)  query += ` WHERE login = '${username}'`
            let user = await pool.query(query)
            if (user && user.rows) return res.json(user.rows[0])
            return res.json({})
        } catch (error) {
            console.log('get users', error);
        }
    }

    static async register(req: Request, res: Response) {
        const { login, password1 } = req.body;
        let query = `INSERT INTO users (login, password, isAdmin)
            VALUES ('${login}', '${password1}', false);`
        try {            
            if (login && password1) {
                await pool.query(query)
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
