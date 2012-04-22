var zombie = require("zombie");
var assert = require("assert");
var util = require("util");
var _ = require("underscore");

var Browser = function (zombie) {
    this.zombie = zombie;
};

Browser.prototype.createCharacter = function (name, callback) {
    console.log("Creating " + name);
    this.zombie
        .fill('newCharacterName', name)
        .pressButton('Add Character', function () {
            console.log("Giving the event a few seconds to arrive...");
            setTimeout(function () {
                console.log("Calling back");
                callback()
            }, 10000);
        });
};

Browser.prototype.characters = function () {
    console.log("Getting characters");
    return browser(function (err, browser) {
        if (err) callback(err, null);
        var chars = _.map(browser.queryAll('.character'), function (x) {
            return x.textContent;
        });
        console.log("Characters:", chars);
        return chars;
    });
};

module.exports = Browser;
