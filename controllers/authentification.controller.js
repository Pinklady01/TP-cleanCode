const models = require('../models');
const User = models.User;
const Session = models.Session;
const SecurityUtil = require('../utils').SecurityUtil;


class AuthentificationController {

    /***
     *Create the user in the database if the information are correct.
     * @param email
     * @param password
     * @param type
     * @returns {Promise<User>}
     */
    static async register(email, password, type = "Members") {
        email = email.toLowerCase();
        if (!SecurityUtil.verifPasswordStrength(password)) {
            throw "Please verify the composition of your password. \n" +
            "The password should contain at least a lowercase, an uppercase, a special character,\n" +
            " a number and have a length of at least 8";
        }
        if (!SecurityUtil.verifEmail(email)) {
            throw "Please verify the composition of the email address";
        }
        return User.create({
            id: null,
            email,
            password: SecurityUtil.hashString(password),
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
     * @param email
     * @param password
     * Retrieve the user from the database
     * @returns {Promise<Session> | null}
     */
    static async login(email, password) {
        let user;
        if (SecurityUtil.verifEmail(email.toLowerCase())) {
            const user = await User.findOne({
                where: {
                    email: email.toLowerCase(),
                    password: SecurityUtil.hashString(password)
                }
            });
        }
        if (!user) {
            throw "Please verify your login";
        }
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

}

module.exports = AuthentificationController;
