const BookController = require('../controllers').BookController;

const bodyParser = require('body-parser');

module.exports = function(app) {

    app.post('/api/book/new-book', bodyParser.json(), async (req, res) => {
        if (req.body.name && req.body.author) {
            try {
                const book = await BookController.addBook(req.body.name,
                    req.body.author);
                res.status(201).json(book);
            } catch (err) {
                console.log(err);
                res.status(409).end();
            }
        }
        if (!req.body.name || !req.body.author) {
            res.status(400).end();
        }
    });

    app.post('/api/book/retrieve/book', bodyParser.json(), async (req, res) => {
        if (req.body.name && req.body.author) {
            try {
                const book = await BookController.retrieveBook(req.body.name, req.body.author);
                res.status(200).json(book);
            } catch (err) {
                console.log(err);
                res.status(409).end();
            }
        }
        if (!req.body.name || !req.body.author) {
            res.status(400).end();
        }
    });

    app.post('/api/book/retrieve/getBooks', bodyParser.json(), async (req, res) => {
        try {
            const books = await BookController.retrieveAllBooks();
            res.status(200).json(books);
        } catch (err) {
            console.log(err);
            res.status(409).end();
        }
    });

    app.post('/api/user/retrieve/book', bodyParser.json(), async (req, res) => {
        if (req.id) {
            try {
                const book = await BookController.retrieveAllBookOfUser(req.body.id);
                res.status(200).json(book);
            } catch (err) {
                console.log(err);
                res.status(409).end();
            }
        }
        if (!req.id) {
            res.status(400).end();
        }
    });

    app.delete('/api/book/delete', bodyParser.json(), async (req, res) => {
        if (req.body.name && req.body.author) {
            try  {
                const book = await BookController.delete(req.body.name, req.body.author);
                res.status(200).json(book);
            } catch(err) {
                console.log(err);
                res.status(500).end();
            }
        }
        if (!req.body.name || !req.body.author) {
            res.status(400).end();
        }
    });
};

