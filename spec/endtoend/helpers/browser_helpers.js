var zombie = require("zombie");
var assert = require("assert");
var log = require("../../../lib/logger");
var util = require("util");
var _ = require("underscore");

var theBrowser = null;

browser = function (callback) {
    if (!(theBrowser != null)) {
        zombie = new zombie.Browser({
            runScripts:true,
            site:"http://localhost:3003",
            debug:true,
            userAgent:"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.7 (KHTML, like Gecko) Chrome/16.0.912.59 Safari/535.7"
        });
        return zombie.visit('/index.html', function (err, newBrowser, status) {
            theBrowser = newBrowser;
            return callback(err, newBrowser, status);
        });
    } else {
        return callback(null, theBrowser);
    }
};

module.exports = {
    createCharacter:function (name, callback) {
        console.log("Creating " + name);
        return browser(function (err, browser) {
            if (err) callback(err, null);
            browser.fill('newCharacterName', name)
                .pressButton('Add Character', function(){
                    browser.wait(500, callback);
                });
        });
    },
    characters:function (name) {
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