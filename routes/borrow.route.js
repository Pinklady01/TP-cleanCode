const BorrowController = require('../controllers').BorrowController;
const AuthentificationMiddleware = require('../middlewares').AuthentificationMiddleware;

const bodyParser = require('body-parser');

module.exports = function(app) {

    app.post('/api/borrow/new', AuthentificationMiddleware.authentification(), bodyParser.json(), async (req, res) => {
        if (req.body.login && req.body.name && req.body.author) {
            const borrow = await BorrowController.userBorrowBook(req.body.login, req.body.name, req.body.author);
            res.status(201).json(borrow);
        }
        if (!req.body.login || !req.body.author || !req.body.name) {
            res.status(400).end();
        }
    });

    app.get('/api/borrow/getBorrowsToReturned', AuthentificationMiddleware.authentification(), bodyParser.json(), async (req, res) => {
        const books = await BorrowController.getBorrows();
        res.status(200).json(books);
    });

    app.get('/api/borrow/getBorrows', AuthentificationMiddleware.authentification(), bodyParser.json(), async (req, res) => {
        const booksToBeReturned = await BorrowController.bookToBeReturned();
        res.status(200).json(booksToBeReturned);
    });

    app.get('/api/borrow/getBorrowsOfUser', AuthentificationMiddleware.authentification(), bodyParser.json(), async (req, res) => {
        if (req.body.login) {
            const booksToBeReturned = await BorrowController.borrowOfAUser(login);
            res.status(200).json(booksToBeReturned);
        }
        res.status(400).end();
    });
};
