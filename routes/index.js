module.exports = function() {
  require('./project.route')(...arguments);
  require('./authentification.route')(...arguments);
  require('./book.route')(...arguments);
};
