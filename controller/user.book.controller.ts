import { Request, Response } from 'express';
import pool from '../entity/config';

let userBook = [
    {
        id: 1,
        userId: 2,
        bookId: 1,
        status: 'Card', // Sold, Card, Order(not payment yet), canceled
        paymentCode: '', // If sold else null
    },
    {
        id: 2,
        userId: 2,
        bookId: 2,
        status: 'Sold', // Sold, Card, Order(not payment yet), canceled
        paymentCode: '', // If sold else null
    },
    {
        id: 3,
        userId: 2,
        bookId: 3,
        status: 'Order', // Sold, Card, Order(not payment yet), canceled
        paymentCode: '', // If sold else null
    },
    {
        id: 4,
        userId: 2,
        bookId: 4,
        status: 'Canceled', // Sold, Card, Order(not payment yet), canceled
        paymentCode: '', // If sold else null
    }
]

class BookUserController {
    static async getUserBook(req: Request, res: Response) {
        try {
            res.json(userBook)
        } catch (error) {
            console.log('getUserBook', error);
        }
    }

    static async orderBook(req: Request, res: Response) {
        let { userId, books } = req.body;
        let resObj = {
            success: false
        };
        let query = `INSERT INTO user_books (userId, bookId, status, paymentCode) VALUES`
            try {
            if (books) {
                for (let index = 0; index < books.length; index++) {
                    query += `(${userId}, ${books[index].id}, 'Order', null)`
                    if (index + 1 < books.length) query += ','
                }
                await pool.query(query)
                resObj.success = true;
            }
            res.json(resObj)
        } catch (error) {
            console.log('getUserBook', error);
        }
    }
}

export default BookUserController;