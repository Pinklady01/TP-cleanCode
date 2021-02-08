module.exports = function() {
    require('./authentification.route')(...arguments);
    require('./project.route')(...arguments);
    require('./book.route')(...arguments);
};
