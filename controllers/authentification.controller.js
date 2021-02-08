const models = require('../models');
const User = models.User;
const Session = models.Session;
const SecurityUtil = require('../utils').SecurityUtil;


class AuthentificationController {

    /***
     *Create the user in the database if the information are correct.
     * @param login
     * @param type
     * @returns {Promise<User>}
     */
    static async register(login, type = "Members") {
        login = login.toLowerCase();
        return User.create({
            id: null,
            login,
            type
        });
    }

    /***
     * Check if a User is an admin. If the user is an admin, return true.
     * @param user
     * @returns {boolean}
     */
    static isAdmin(user) {
        return user.type === 'Admin';
    }

    /***
     *Retrieve the user by the input login. If the input login is an email, retrieve by email and password.
     *Other, we verify if the input login is a pseudo.
     * @param login
     * Retrieve the user from the database
     * @returns {Promise<Session> | null}
     */
    static async login(login) {
        const user = await User.findOne({
            where: {
                email: email.toLowerCase(),
            }
        });
        let session = await this.sessionOfUser(user.id);
        if(!session){
            const token = await SecurityUtil.randomToken();
            console.log(new Date());
            session = await Session.create({
                token,
                UserId : user.id
            });
        }
        await session.set(user);
        return session;
    }

    /***
     *Update the game_time of the user before deleting its session
     * @param id
     */
    static async logout(id) {
        const user = await User.findOne({
            where: {
                id: id,
            }
        });
        await Session.destroy({
            where:{
                UserId : user.id
            }
        });
    }

    /***
     *Retrieve the user who is using a session
     * @param token
     * @returns {Promise<User> | null}
     */
    static userFromToken(token) {
        return User.findOne({
            include: [{
                model: Session,
                where: {
                    token
                }
            }]
        });
    }

    /***
     *Retrieve the session of a user through its id
     * @param id
     * @returns {Promise<User> | null}
     */
    static sessionOfUser(id) {
        return User.findOne({
            include: [{
                model: Session,
                where: {
                    UserId : id
                }
            }]
        });
    }


    /***
     *Retrieve the user through its login
     * @param login
     * @returns {Promise<User> | null}
     */
    static async accountOfUser(login) {
        return await User.findOne({
            where: {
                login: login
            }
        });
    }
}

module.exports = AuthentificationController;
