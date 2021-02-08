const bodyParser = require('body-parser');
const AuthentificationController = require('../controllers').AuthentificationController;
const AuthentificationMiddleware = require('../middlewares').AuthentificationMiddleware;

module.exports = function(app) {

    app.post('/api/register', bodyParser.json(), async (req, res) => {
        if(req.body.email && req.body.password) {
            try{
                let user;
                if(req.body.type){
                    user = await AuthentificationController.register(req.body.email,
                        req.body.password,
                        req.body.type);
                    res.status(201).json(user);
                }
                if(!req.body.type){
                    user = await AuthentificationController.register(req.body.email,
                        req.body.password);
                    res.status(201).json(user);
                }
            } catch(err) {
                console.log(err);
                res.status(409).end();
            }
        }
        if(!req.body.email || !req.body.password){
            res.status(400).end();
        }
    });

    app.post('/api/createAdmin', AuthentificationMiddleware.authentification(), bodyParser.json(), async (req, res) => {
        if(req.body.email && req.body.password) {
            try{
                let user;
                user = await AuthentificationController.register(req.body.email,
                    req.body.password,
                    "Admin");
                res.status(201).json(user);
            } catch(err) {
                console.log(err);
                res.status(409).end();
            }
            if(!req.body.email || !req.body.password) {
                res.status(400).end();
            }
        }
    });

    app.post('/api/login', bodyParser.json(), async (req, res) => {
        if(req.body.login && req.body.password) {
            try  {
                const session = await AuthentificationController.login(req.body.login, req.body.password);
                if(session) {
                    res.status(201).json(session);
                } else {
                    res.status(401).end();
                }
            } catch(err) {
                console.log(err);
                res.status(500).end();
            }
        }
        if(!req.body.login || !req.body.password) {
            res.status(400).end();
        }
    });

    app.delete('/api/logout', bodyParser.json(), async (req, res) => {
        if(req.body.id) {
            try  {
                await AuthentificationController.logout(req.body.id);
                res.status(200).end();
            } catch(err) {
                console.log(err);
                res.status(500).end();
            }
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
