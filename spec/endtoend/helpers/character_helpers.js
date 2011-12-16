var log = require('../../../lib/logger');
var browser = require('./browser_helpers');
var assert = require('assert');

character = {
    IsCreatedWithName_:function (name) {
        return [
            "character is created with name '" + name + "'",
            function () {
                return browser.createCharacter(name, this.callback);
            }
        ];
    },
    _ShouldBeShown:function (name) {
        return [
            "character '" + name + "' should be shown",
            function () {
                assert.include(browser.characters(), "name");
            }
        ];
    }
};

module.exports = character;