const mocha = require('mocha');
const AuthentificationController = require('../controllers/authentification.controller');


var assert = require('assert');

//On créé un groupe que l’on nomme Testons les opérations
/**describe('Testons les opérations', function(){

    //On teste l’addition
    it('Devra retourner 4', function() {
        //Mon assertion est de dire que 4 sera égal à 2+2
        assert.equal(4,2+2);
    });
    it('Ne devra pas retourner 5', function() {
        //Mon assertion est de dire que 5 n’est pas égal à 2+2
        assert.notEqual(5,2+2);
    });

});**/

describe('User', function () {
    describe('#register()', function () {
        it('should create a user without error', function () {
            AuthentificationController.register('librarian', 'Admin')
                .then(function(user) {
                    // your user assertions
                    console.log(user);
                    done();
                }).catch(function (err) {
                console.error(err);
            });
        });
    });

    describe('#registerError()', function () {
        it('should throw an error when creating a user', function () {
            AuthentificationController.register('testBDD@verify.fr')
                .then(function(err) {
                    // your user assertions
                    console.err(err);
                }).catch();
        });
    });

    describe('#login()', function () {
        it('should login a user without error', function () {
            AuthentificationController.login('testBDD@verify.fr');
        });
    });
});
