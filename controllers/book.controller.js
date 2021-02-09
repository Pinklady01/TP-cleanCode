const models = require('../models');
const Book = models.Book;

class BookController{

    /***
     * Add a book
     * @param name
     * @param author
     * @returns {Promise<Book>}
     */
    static async addBook(name, author) {
        return await Book.create({
            id: null,
            name,
            author: author
        });
    }

    /***
     * Retrieve user's book
     * @param id_user
     * @returns {Promise<Book>}
     */
    static async retrieveAllBookOfUser(id_user) {
        return Book.findAll({
            where: {
                user_id: id_user
            }
        });
    }

    /***
     * Retrieve all books
     * @returns {Promise<Book>}
     */
    static async retrieveAllBooks() {
        return Book.findAll({});
    }

    /***
     * Retrieve a book by its name and author
     * @param name
     * @param author
     * @returns {Promise<Book>}
     */
    static async retrieveBook(name, author) {
        return Book.findAll({
            where: {
                name: name,
                author: author
            }
        });
    }

    /***
     * Retrieve a book by its id
     * @param id_book
     * @returns {Promise<Book>}
     */
    static async retrieveBookByID(id_book) {
        const book = await Book.findOne({
            where: {
                id: id_book,
            }
        });
        if(!book) {
            throw "The book " + id_book +" doesn't exist";
        }
        return book;
    }

    /***
     * Delete a book by its id
     * @param id_book
     * @returns {Promise<void>}
     */
    static async deleteById(id_book) {
        await Book.destroy({
            where: {
                id: id_book
            }
        });
    }

    /***
     * Delete a book by its name and author
     * @param name
     * @param author
     * @returns {Promise<void>}
     */
    static async delete(name, author) {
        await Book.destroy({
            where: {
                name: name,
                author: author
            }
        });
    }

}

module.exports = BookController;
