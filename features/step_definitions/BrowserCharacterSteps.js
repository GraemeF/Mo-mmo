require('chai').should();
var soon = require('patience').soon;
var util = require('util');

module.exports = function () {

    this.When('I create a character named $name', function (name, callback) {
        this.browser.createCharacter(name, callback);
    });

    this.Then('a character named $name should be shown', function (name, callback) {
        soon(function () {
            this.browser.characters().should.include(name);
        }, this, this.failStepOnError(callback));
    });
};