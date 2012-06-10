var spawn = require('child_process').spawn;
var Zombie = require("zombie");
var Browser = require('./browser');

var runServer = function (callback) {
    var commandProcess = spawn("node", ["lib/server"]);
    commandProcess.stdout.on('data', function (data) {
        if (data.toString() === 'Ready.\n') {
            callback(null, commandProcess);
        }
    });
};

var hooks = function () {
    this.Before(function (callback) {
        var world = this;

        runServer(function (error, serverProcess) {
            world.serverProcess = serverProcess;
            callback(error);
        });
    });

    this.Before("@browser", function (callback) {
        var world = this;
        var zombie = new Zombie.Browser({
                                            runScripts: true,
                                            site: 'http://localhost:3003'
                                        });

        zombie.visit('/index.html', function (error, newBrowser) {
            world.browser = new Browser(newBrowser);
            callback(error);
        });
    });

    this.After(function (callback) {
        this.serverProcess.on('exit', callback);
        this.serverProcess.kill();
    });
};

module.exports = hooks;