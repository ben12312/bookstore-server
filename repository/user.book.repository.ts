import pool from '../entity/config';
import UserBookService from '../services/user.book.service';

class UserBookRepository {
    static async getUserBookRepo(req: any) {
        let { userId } = req.query;
        let query = `SELECT ub.*,b.* FROM userbooks ub
        LEFT JOIN books b ON ub.bookId = b.id 
        WHERE ub.userId = ${userId};`;
        let response = await pool.query(query)
        
        return response;
    }

    static async oderBookRepo(req: any) {
        let { userId, books } = req.body;
        let resObj = {
            success: false
        };
        let query = `INSERT INTO userbooks (userId, bookId, status, paymentCode, count, total_price) VALUES`
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

    static async payBook(req: any) {
        let {userId, book} = req.body;
        let getUserQuery = `SELECT * FROM users WHERE id = ${userId}`;
        let userLogin = await pool.query(getUserQuery);
        userLogin = userLogin.rows ? userLogin.rows[0] : null;
        if (!userLogin) return null;

        let calculatePoin = UserBookService.calculatePoint(userLogin, book);
        if (!calculatePoin.success) return null;
        
        let updateUserQuery = `UPDATE users
        SET point = ${calculatePoin.data}
        WHERE id = ${userId} RETURNING *;`
        let resUpdate = await pool.query(updateUserQuery);

        let updateStatus = `UPDATE userbooks
        SET status = 'Paid' WHERE id = ${book.id} RETURNING *;`;
        await pool.query(updateStatus);
        
        return resUpdate;
    }

    static async cancelOrder(req: any) {
        let {book} = req.body;
        let deleteUserBook = `DELETE FROM userbooks WHERE id = ${book.id};`;
        await pool.query(deleteUserBook);
        return true
    }
}

export default UserBookRepository;