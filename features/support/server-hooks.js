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
    commandProcess.on('exit', function (code, signal) {
        console.log('Server process terminated due to receipt of signal ' + signal);
    });
};

var hooks = function () {
    this.Around(function (runScenario) {
        var world = this;

        runServer(function (error, serverProcess) {
            world.serverProcess = serverProcess;
            var zombie = new Zombie.Browser({
                                                runScripts: true,
                                                site: 'http://localhost:3003'
                                            });

            zombie.visit('/index.html', function (err, newBrowser) {
                world.browser = new Browser(newBrowser);
                process.nextTick(function () {
                    runScenario(function (callback) {
                        serverProcess.kill();
                        callback();
                    });
                });
            });
        });

    });
};

module.exports = hooks;