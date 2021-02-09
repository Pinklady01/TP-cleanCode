const BookController = require('../controllers').BookController;
const AuthentificationMiddleware = require('../middlewares').AuthentificationMiddleware;

const bodyParser = require('body-parser');

module.exports = function(app) {

    app.post('/api/book/new-book', AuthentificationMiddleware.authentification(), bodyParser.json(), async (req, res) => {
        if (req.body.name && req.body.author) {
            const book = await BookController.addBook(req.body.name,
                req.body.author);
            res.status(201).json(book);
        }
        if (!req.body.name || !req.body.author) {
            res.status(400).end();
        }
    });

    app.post('/api/book/retrieve/book', bodyParser.json(), async (req, res) => {
        if (req.body.name && req.body.author) {
            const book = await BookController.retrieveBook(req.body.name, req.body.author);
            res.status(200).json(book);
        }
        if (!req.body.name || !req.body.author) {
            res.status(400).end();
        }
    });

    app.get('/api/book/retrieve/getBooks', bodyParser.json(), async (req, res) => {
        const books = await BookController.retrieveAllBooks();
        res.status(200).json(books);
    });

    app.post('/api/user/retrieve/book',AuthentificationMiddleware.authentification(), bodyParser.json(), async (req, res) => {
        if (req.id) {
            const book = await BookController.retrieveAllBookOfUser(req.body.id);
            res.status(200).json(book);
        }
        if (!req.id) {
            res.status(400).end();
        }
    });

    app.delete('/api/book/delete', AuthentificationMiddleware.authentification(), bodyParser.json(), async (req, res) => {
        if (req.body.name && req.body.author) {
            const book = await BookController.delete(req.body.name, req.body.author);
            res.status(200).json(book);
        }
        if (!req.body.name || !req.body.author) {
            res.status(400).end();
        }
    });
};

