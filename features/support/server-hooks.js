var spawn = require('child_process').spawn;
var Zombie = require("zombie");
var Browser = require('./browser');
var request = require('request');
var util = require('util');
var io = require('socket.io-client');

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
            world.baseUri = 'http://localhost:3003';
            world.socket = io.connect(world.baseUri);

            world.sendCommand = function (command, callback) {
                //console.log("POSTing command:", util.inspect(command, false, null));
                request.post({
                                 uri: world.baseUri + "/commands",
                                 json: command
                             },
                             function (error, response, body) {
                                 if (error === null) {
                                     if (response.statusCode !== 201) {
                                         error = body;
                                     }
                                 }
                                 callback(error, response);
                             });
            };

            callback(error);
        });
    });

    this.Before("@browser", function (callback) {
        var world = this;
        var zombie = new Zombie.Browser({
                                            runScripts: true,
                                            site: this.baseUri
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