const mocha = require('mocha');
const BookController = require('../controllers/book.controller');


var assert = require('assert');

describe('Book', function () {
    describe('#addBook()', function () {
        it('should create a book without error', function () {
            BookController.addBook('test', 'junior')
                .then(function(book) {
                    // your user assertions
                    console.log(book);
                    done();
                }).catch(function (err) {
                console.error(err);
            });
        });
    });

    describe('#addBookError()', function () {
        it('should throw an error when creating a book', function () {
            BookController.addBook('test')
                .then(function(err) {
                    // your user assertions
                    console.err(err);
                }).catch();
        });
    });

    describe('#retrieve()', function () {
        it('should retrieve a book without error', function () {
            BookController.addBook('test', 'junioorr');
            BookController.retrieveBook('test', 'junioorr')
                .then(function(book) {
                    // your user assertions
                    console.err(book);
                    done();
                }).catch();
        });
    });

    describe('#retrieveError()', function () {
        it('should retrieve a book with error', function () {
            BookController.retrieveBook('', 'junioorr')
                .then(function(err) {
                    // your user assertions
                    console.err(err);
                }).catch();
        });
    });
});
