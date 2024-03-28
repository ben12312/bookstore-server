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
        let isAdmin = false;
        if (login == 'Admin') isAdmin = true;
        let query = `INSERT INTO users (login, password, isAdmin, point)
        VALUES ('${login}', '${password1}', ${isAdmin}, 100);`
        await pool.query(query)
        return true;
    }
}

export default UserRepository;

