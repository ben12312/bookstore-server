class UserBookService {
    static calculatePoint(user: any, book: any) {
        let result = {
            message: 'Failed Buy',
            success: false,
            data: 0
        }
        if (!user) return result
        if (book.total_price > user.point) {
            result.message = 'Not Enough Point To Buy';
        } else {
            result.data = user.point - book.total_price;
            result.message = `Success Pay`;
            result.success = true;
        }
        return result
    }
}

export default UserBookService;

