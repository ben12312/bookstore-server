import router from 'express';
const Router = router.Router();
import BookController from '../controller/book.controller';
import UserController from '../controller/user.controller';
import UserBookController from '../controller/user.book.controller';

Router.get('/books/get', BookController.getBooks);
Router.post('/books/post', BookController.insertBooks);

Router.get('/users/get', UserController.getUsers);
Router.post('/users/register', UserController.register);

Router.get('/user-book/get', UserBookController.getUserBook);
Router.post('/user-book/order', UserBookController.orderBook);
Router.post('/user-book/pay', UserBookController.payBook);
Router.post('/user-book/cancel', UserBookController.cancelOrder);

export default Router;