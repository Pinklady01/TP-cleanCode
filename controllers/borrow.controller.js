const models = require('../models');
const Borrow = models.Borrow;
const User = models.User;
const Book = models.Book;
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
        await borrow.set(book);
        await borrow.setUser(user);
        await book.setBorrow(borrow);
        return Borrow;
    }

    /***
     * Delete borrow
     * @param user
     * @param book
     * @returns {Promise<Borrow>}
     */
    static async deleteBorrow(user, book) {
        await Borrow.destroy({
            where:{
                UserId : user.id,
                BookId: book.id
            }
        });
    }

    /***
     * Save a book loan to a member
     * @param login
     * @param bookName
     * @param bookAuthor
     * @returns {Promise<Borrow>}
     */
    static async userBorrowBook(login, bookName, bookAuthor) {
        const user = await this.retrieveUser(login);
        let borrows;
        if(user){
            borrows = await Borrow.findAll({
                where: {
                    UserId: user.id
                }
            });
        }
        console.log(borrows.length);
        if(borrows.length < 3){
            const book = await Book.findOne({
                where: {
                    name: bookName,
                    author: bookAuthor
                }
            });
            await this.saveBorrow(user, book);
        }
        return borrows;
    }

    /***
     * Get books to be returned
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

    /***
     * Get all borrowed book
     * @returns {Promise<Borrow>}
     */
    static async getBorrows() {
        return await Borrow.findAll();
    }

    /***
     * retrieve a user from its login
     * @param login
     * @returns {Promise<User>}
     */
    static async retrieveUser(login) {
        return await User.findOne({
            where: {
                login: login.toLowerCase()
            }
        });
    }

    /***
     * Return the borrow of a user
     * @returns {Promise<Borrow>}
     */
    static async borrowOfAUser(login) {
        const user = this.retrieveUser(login);
        return await user.getBorrows();
    }


}


module.exports = BorrowController;
