import { Request, Response } from 'express';
import pool from '../entity/config';

const booksData = [
    {
        id: 1,
        title: 'Mick Herron 1',
        writer: 'Benjamin Listwon, Erik Hanchett',
        cover_image: `https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg`,
        point: 45,
        tag: `fiction`,
        inStock: 5
    },
    {
        id: 2,
        title: 'Mick Herron 2',
        writer: 'Andrea Passaglia',
        cover_image: `https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg`,
        point: 20,
        tag: `non-fiction`,
        inStock: 5
    },
    {
        id: 3,
        title: 'Mick Herron 3',
        writer: 'Callum Macrae',
        cover_image: `https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg`,
        point: 22,
        tag: `science`,
        inStock: 5
    },
    {
        id: 4,
        title: 'Mick Herron 4',
        writer: 'Olga Filipova',
        cover_image: `https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg`,
        point: 35,
        tag: `essay`,
        inStock: 5
    },    {
        id: 5,
        title: 'Mick Herron 5',
        writer: 'Callum Macrae',
        cover_image: `https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg`,
        point: 22,
        tag: `science`,
        inStock: 5
    },
    {
        id: 6,
        title: 'Mick Herron 6',
        writer: 'Olga Filipova',
        cover_image: `https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg`,
        point: 35,
        tag: `essay`,
        inStock: 5
    },    {
        id: 7,
        title: 'Mick Herron 7',
        writer: 'Callum Macrae',
        cover_image: `https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg`,
        point: 22,
        tag: `science`,
        inStock: 5
    },
];

class BookController {
    static async getBooks(req: Request, res: Response) {
        try {
            let books = await pool.query(`SELECT * FROM books`)
            res.status(200).json(books.rows)
            // res.status(200).json(booksData)
        } catch (error) {
            console.log('getBooks', error);
            res.status(400)
        }
    }

    static async insertBooks(req: Request, res: Response) {
        let data = req.body;
        let query = `INSERT INTO books (title, writer, cover_image, point, tag, inStock)
        VALUES ('${data.title}', '${data.author}', 'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg', ${+data.price}, '${data.tag}', ${+data.instock});`
        try {
            await pool.query(query)
            res.json({})
        } catch (error) {
            console.log('insertBooks', error);
            res.status(400)
        }
    }

    static async orderBooks(req: Request, res: Response) {
        try {
            
        } catch (error) {
            console.log('orderBooks', error);
            res.status(400)            
        }
    }
}

export default BookController;