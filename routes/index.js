module.exports = function() {
    require('./authentification.route')(...arguments);
    require('./book.route')(...arguments);
    require('./borrow.route')(...arguments);
};
