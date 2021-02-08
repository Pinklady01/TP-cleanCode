const bodyParser = require('body-parser');
const AuthentificationController = require('../controllers').AuthentificationController;
const AuthentificationMiddleware = require('../middlewares').AuthentificationMiddleware;

module.exports = function(app) {
    app.post('/api/register', bodyParser.json(), async (req, res) => {
        if (req.body.login && req.body.type) {
            const user = await AuthentificationController.register(req.body.login,
                req.body.type);
            res.status(201).json(user);
        }

        if (req.body.login && !req.body.type) {
            user = await AuthentificationController.register(req.body.login);
            res.status(201).json(user);
        }
        if (!req.body.login && !req.body.login) {
            res.status(400).end();
        }
    });

    app.post('/api/createAdmin', AuthentificationMiddleware.authentification(), bodyParser.json(), async (req, res) => {
        if(req.body.login) {
            let user;
            user = await AuthentificationController.register(req.body.login,
                "Admin");
            res.status(201).json(user);
        }
        if(!req.body.login) {
            res.status(400).end();
        }
    });

    app.post('/api/login', bodyParser.json(), async (req, res) => {
        let session;
        if(req.body.login && req.body.password) {
            session = await AuthentificationController.login(req.body.login);
        }
        if(session) {
            res.status(201).json(session);
        }
        if(!req.body.login) {
            res.status(400).end();
        }
        res.status(401).end();
    });

    app.delete('/api/logout', bodyParser.json(), async (req, res) => {
        if(req.body.id) {
            await AuthentificationController.logout(req.body.id);
            res.status(200).end();
        }
        if(!req.body.id) {
            res.status(400).end();
        }
    });

    app.get('/api/auth/getUser', AuthentificationMiddleware.authentification(), async (req, res) => {
        const token = req.headers['authorization'].slice(7);
        res.status(200).json(await AuthentificationController.userFromToken(token));
    });

};
