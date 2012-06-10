var io = require("socket.io");
var Mommo = require('../../lib');

var runServer = function (callback) {

    var ioServer = io.listen(commandServer.server);

    ioServer.configure(function () {
        return ioServer.disable('log');
    });

    ioServer.configure('test', function () {
        ioServer.set('transports', ['xhr-polling']);
        return ioServer.disable('log');
    });

    var eventServer = new Mommo.App.EventServer(ioServer, commandServer.domainEvents);

    eventServer.publishDomainEvents();

    var EventSource = function () {};

    EventSource.prototype.connect = function (baseUri) {
        var uri;
        uri = baseUri;
        return this.socket = ioClient.connect(uri);
    };

    EventSource.prototype.subscribe = function (eventName, handler) {
        return this.socket.on(eventName, handler);
    };

    var client = new EventSource();

    var active = false;

    eventServer.ready = function (callback) {
        if (active) {
            process.nextTick(callback);
        } else {
            active = true;
            client.connect("http://localhost:" + commandServer.port);
            eventServer.waitForConnection(callback);
        }
    };

    var wait = function (callback) {
        if (!active) {
            process.nextTick(wait);
        } else {
            process.nextTick(callback);
        }
    };

    callback(null, server);
};

var hooks = function () {
    this.Around(function (runScenario) {
        var world = this;

        runServer(function (error, server) {
            world.server = server;
            process.nextTick(function () {
                runScenario(function (callback) {
                    server.kill();
                    callback();
                });
            });
        });

    });
};

module.exports = hooks;