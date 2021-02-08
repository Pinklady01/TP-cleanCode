const models = require('../models');
const User = models.User;
const Borrow = models.Borrow;
const AuthentificationController = require('authentification.controller');
const BookController = require('book.controller');
const SecurityUtil = require('../utils').SecurityUtil;
const { Op } = require('sequelize');

class BorrowController {

    /***
     * Save a book loan to a member
     * @param user
     * @param book
     * @returns {Promise<Borrow>}
     */
    static async saveBorrow(user, book) {
        const borrow = await Borrow.create({
            id: null,
            dateEmprunt: null,
        });
        borrow.set(book);
        await user.add(borrow);
        return Borrow;
    }

    /***
     * Save a book loan to a member
     * @param login
     * @param bookName
     * @param bookAuthor
     * @returns {Promise<Borrow>}
     */
    static async userBorrowBook(login, bookName, bookAuthor) {
        const user = AuthentificationController.accountOfUser(login);
        let borrows = user.getBorrows();
        if(borrows.length < 3){
            const book = await BookController.retrieveBook(bookName, bookAuthor);
            await this.saveBorrow(user, book);
            borrows = user.getBorrows();
        }
        return borrows;
    }

    /***
     * Save a book loan to a member
     * @returns {Promise<Borrow>}
     */
    static async bookToBeReturned() {
        const startDate = new Date();
        startedDate.setMonth(d.getMonth() - 3);
        const today = new Date(new Date());
        return await Borrow.findAll({
            where: {
                from: {
                    [Op.between]: [startDate, today]
                }
            }
        });
    }


}


module.exports = BorrowController;
