import pool from '../entity/config';

class UserBookRepository {
    static async getUserBookRepo(req: any) {
        let { userId } = req.query;
        let query = `SELECT ub.*,b.* FROM user_books ub
        LEFT JOIN books b ON ub.bookId = b.id WHERE ub.userId = ${userId};`;
        let response = await pool.query(query)
        return response;
    }

    static async oderBookRepo(req: any) {
        let { userId, books } = req.body;
        let resObj = {
            success: false
        };
        let query = `INSERT INTO user_books (userId, bookId, status, paymentCode, count, total_price) VALUES`
        if (books) {
            for (let index = 0; index < books.length; index++) {
                query += `(${userId}, ${books[index].id}, 'Order', null, ${books[index].count}, ${books[index].total})`
                if (index + 1 < books.length) query += ','
            }
            await pool.query(query)
            resObj.success = true;
        }
        return resObj
    }
}

export default UserBookRepository;