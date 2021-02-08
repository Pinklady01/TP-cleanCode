const crypto = require('crypto');

class SecurityUtils {

    /**
     * @param string {string}
     * Return the hash of the string
     * @returns {string}
     */
    static hashString(string) {
        const hash = crypto.createHash('sha256');
        hash.update(string);
        return hash.digest('hex').toString();
    }

    /***
     * Create random Token with 32 length
     * @returns {Promise}
     */
    static randomToken() {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(32, (err, buf) => {
                if(err) {
                    reject(err);
                    return;
                }
                resolve(buf.toString('hex'));
            });
        });
    }

    /***
     *Verify the email structure. If the email is not well composed, it will return false.
     * @param email
     * @returns {boolean}
     */
    static verifEmail(email){
        let regex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/;
        return email.match(regex) != null;
    }

    /***
     * Verify the composition of the password. If it is too short or too easy, it will returns false.
     * @param password
     * @returns {boolean}
     */
    static verifPasswordStrength(password){
        let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*\\-_/]).{8,}$/;
        return password.match(regex) != null;
    }
}

module.exports = SecurityUtils;
