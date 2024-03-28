import pg from 'pg';
const Pool = pg.Pool

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'asdasd',
  port: 5432,
})

async function setupDb() { //DATABASE PG VERSION 8.11 NOT SUPPORT "IF NOT EXIST" QUERY SO NEED TO OPEN/CLOSE THIS FUNCTION FOR SETUP
    try {
        await pool.query(`CREATE DATABASE bookstore`)
        await pool.query(`CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            login VARCHAR(255) NOT NULL,
            password VARCHAR(255),
            isAdmin BOOLEAN NOT NULL,
            point INT NOT NULL
        );`)
        await pool.query(`CREATE TABLE books (
            id SERIAL PRIMARY KEY,
            title  VARCHAR(255) NOT NULL,
            writer VARCHAR(255) NOT NULL,
            cover_image  VARCHAR(255) NOT NULL,
            point INT NOT NULL,
            tag VARCHAR(255) NOT NULL,
            inStock INT NOT NULL
        );`)
        await pool.query(`CREATE TABLE userbooks (
            id SERIAL PRIMARY KEY,
            userId INT NOT NULL,
            bookId INT NOT NULL,
            count INT NOT NULL,
            total_price INT NOT NULL,
            status VARCHAR(255) NOT NULL,
            paymentCode VARCHAR(255)
        );`)
    } catch (error) {
        console.log(error);
    }
}
// setupDb()

export default pool;