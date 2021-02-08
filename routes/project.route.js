const AuthentificationMiddleware = require('../middlewares').AuthentificationMiddleware;

module.exports = function(app) {

    app.get('/api/project', AuthentificationMiddleware.authentification(), async (req, res) => {
        console.log(req.user.id);
        res.status(204).end();
    });
};
