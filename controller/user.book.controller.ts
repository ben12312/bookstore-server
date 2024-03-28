import { Request, Response } from 'express';
import UserBookRepository from '../repository/user.book.repository';

class BookUserController {
    static async getUserBook(req: Request, res: Response) {
        try {
            let orders = await UserBookRepository.getUserBookRepo(req)
            if (orders) return res.json(orders.rows)
            res.json([])
        } catch (error) {
            console.log('getUserBook', error);
        }
    }

    static async orderBook(req: Request, res: Response) {
        try {
            let resObj = await UserBookRepository.oderBookRepo(req)
            res.json(resObj)
        } catch (error) {
            console.log('orderBook', error);
        }
    }

    static async payBook(req: Request, res: Response) {
        try {
            
        } catch (error) {
            
        }
    }
}

export default BookUserController;