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
            let resObj = await UserBookRepository.oderBookRepo(req);
            res.json(resObj)
        } catch (error) {
            console.log('orderBook', error);
        }
    }

    static async payBook(req: Request, res: Response) {
        try {
            let resPay = await UserBookRepository.payBook(req);
            res.status(200).json({
                message: 'success',
                data: (resPay && resPay.rows) ? resPay.rows[0] : {}
            })
        } catch (error) {
            console.log('payBook', error);
        }
    }

    static async cancelOrder(req: Request, res: Response) {
        try {
            let resPay = await UserBookRepository.cancelOrder(req);
            res.status(200).json({
                message: 'success',
                data: resPay
            })
        } catch (error) {
            console.log('payBook', error);
        }
    }
}

export default BookUserController;