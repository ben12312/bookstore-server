import { Request, Response } from 'express';
import BookRepository from '../repository/book.repository';

class BookController {
    static async getBooks(req: Request, res: Response) {
        try {
            // let books = await pool.query(`SELECT * FROM books`)
            let books = await BookRepository.getBooksRepo(req);
            res.status(200).json(books.rows)
        } catch (error) {
            console.log('getBooks', error);
            res.status(400)
        }
    }

    static async insertBooks(req: Request, res: Response) {
        try {
            await BookRepository.insBooksRepo(req);
            res.json({})
        } catch (error) {
            console.log('insertBooks', error);
            res.status(400)
        }
    }
}

export default BookController;