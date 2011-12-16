var assert, browser, log, theBrowser, util, zombie;

zombie = require("zombie");

assert = require("assert");

log = require("../../../lib/logger");

util = require("util");

theBrowser = null;

browser = function (callback) {
    if (!(theBrowser != null)) {
        zombie = new zombie.Browser({
            runScripts:true,
            site:"http://localhost:3003",
            debug:false,
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
            return browser.fill('newCharacterName', name).pressButton('Add Character', callback);
        });
    },
    characters:function (name) {
        console.log("Getting characters");
        return browser(function (err, browser) {
            if (err) callback(err, null);
            return browser.queryAll('.character');
        });
    }
};
