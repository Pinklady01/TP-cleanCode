module.exports = function() {
    require('./authentification.route')(...arguments);
    require('./book.route')(...arguments);
};
