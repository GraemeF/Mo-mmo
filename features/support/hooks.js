var spawn = require('child_process').spawn;
var Zombie = require("zombie");
var Browser = require('../../helpers/browser');
var request = require('request');
var util = require('util');
var io = require('socket.io-client');
var _ = require('underscore');

var events = [
    'characterCreated',
    'characterDeleted',
    'characterMoving',
    'characterStopped'
];

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

        world.failStepOnError = function (callback) {
            return function (error) {
                if (error) {
                    callback.fail(error);
                }
                callback();
            };
        };

        runServer(function (error, serverProcess) {
            world.serverProcess = serverProcess;
            world.baseUri = 'http://localhost:3003/';
            world.socket = io.connect(world.baseUri, {'force new connection': true});
            world.socket.on('connect', function () {
                world.events = [];

                _.each(events, function (event) {
                    world.socket.on(event, function (data) {
                        world.events.push(data);
                    });
                });

                world.sendCommand = function (command, callback) {
                    request.post({
                                     uri: world.baseUri + "commands",
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
    });

    this.Before("@browser", function (callback) {
        var world = this;
        var zombie = new Zombie.Browser({
                                            debug: false,
                                            site: this.baseUri
                                        });

        zombie.visit('/index.html', function (error, newBrowser) {
            world.browser = new Browser(newBrowser);
            callback(error);
        });
    });

    this.After("@browser", function (callback) {
        this.browser = null;
        callback();
    });

    this.After(function (callback) {
        this.socket = null;
        this.serverProcess.on('exit', callback);
        this.serverProcess.kill();
    });
};

module.exports = hooks;