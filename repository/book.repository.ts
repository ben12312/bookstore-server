import pool from '../entity/config';

class BookRepository {
    static async getBooksRepo(req: any) {
        let response = await pool.query(`SELECT * FROM books`)
        return response;
    }

    static async insBooksRepo(req: any) {
        let data = req.body;
        let query = `INSERT INTO books (title, writer, cover_image, point, tag, inStock)
            VALUES ('${data.title}', '${data.author}', 'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg', ${+data.price}, '${data.tag}', ${+data.instock});`
        await pool.query(query)
        return true;
    }
}

export default BookRepository;

