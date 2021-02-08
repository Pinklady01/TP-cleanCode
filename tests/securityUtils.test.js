const mocha = require('mocha');
const SecuUtil = require('../utils/security.utils');

var assert = require('assert');

describe('verifEmail', function () {
    describe('#verifEmail_Size()', function () {
        it('should return false', function () {
            assert.equal(SecuUtil.verifEmail(""), false);
        });
    });
    describe('#verifEmail_Composition()', function () {
        it('should return false for unwanted characters', function () {
            assert.equal(SecuUtil.verifEmail("Email#test@pa.fr"), false);
        });
        it('should return false for upper and double "@"', function () {
            assert.equal(SecuUtil.verifEmail("Email@test@pa.fr"), false);
        });
        it('should return false for lowercase and double "@"', function () {
            assert.equal(SecuUtil.verifEmail("email@test@pa.fr"), false);
        });
        it('should return true', function () {
            assert.equal(SecuUtil.verifEmail("amazing@pa.fr"), true);
        });
    });
});

