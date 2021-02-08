const AuthentificationController = require('../controllers').AuthentificationController;

class AuthentificationMiddleware {
    /***
     *
     * Verify if there is a token and if a user is currently using it
     * @returns {function(user)}
     */
    static authentification() {
        return async function (req, res, next) {
            const authorization = req.headers['authorization'];
            if (!authorization || !authorization.startsWith('Bearer ')) {
                res.status(401).end();
                return;
            }
            const token = authorization.slice(7);
            const user = await AuthentificationController.userFromToken(token);
            if (!user || !AuthentificationController.isAdmin(user)) {
                res.status(403).end();
                return;
            }
            req.user = user;
            next();
        };
    }
}

module.exports = AuthentificationMiddleware;
