import pool from '../entity/config';

class UserRepository {
    static async getUsersRepo(req: any) {
        const { username } = req.query;
        let query = `SELECT * FROM users`
        if (username)  query += ` WHERE login = '${username}'`
        let response = await pool.query(query)
        return response;
    }

    static async registerRepo(req: any) {
        const { login, password1 } = req.body;
        let query = `INSERT INTO users (login, password, isAdmin)
        VALUES ('${login}', '${password1}', false);`
        await pool.query(query)
        return true;
    }
}

export default UserRepository;

