var zombie = require("zombie");
var assert = require("assert");
var util = require("util");
var _ = require("underscore");

module.exports = {
    createCharacter:function (name, callback) {
        console.log("Creating " + name);
        return browser(function (err, browser) {
            if (err) callback(err, null);
            browser.fill('newCharacterName', name)
                .pressButton('Add Character', function () {
                    console.log("Giving the event a few seconds to arrive...");
                    setTimeout(function(){console.log("Calling back");callback()},10000);
                    /*
                     browser.wait(function () {
                     var chars = module.exports.characters();
                     console.log("Checking for character:", chars);
                     return _.any(module.exports.characters(), function (x) {
                     console.log("Checking for character:", x);
                     return x === name;
                     })
                     }, callback);
                     */
                });
        });
    },
    characters:function () {
        console.log("Getting characters");
        return browser(function (err, browser) {
            if (err) callback(err, null);
            var chars = _.map(browser.queryAll('.character'), function (x) {
                return x.textContent;
            });
            console.log("Characters:", chars);
            return chars;
        });
    }
};
