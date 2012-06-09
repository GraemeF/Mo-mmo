var CommandServer, express, log, util;

util = require("util");

express = require("express");

log = require('../logger');

CommandServer = (function () {

    function CommandServer(server, processor) {
        this.server = server;
        this.processor = processor;
    }

    CommandServer.prototype.listen = function (port, callback) {
        var theProcessor;
        this.server.use(express.logger("dev"));
        this.server.use(express.static(__dirname + '/../ui'));
        this.server.use(express.bodyParser());
        theProcessor = this.processor;
        this.server.post('/commands', function (req, res) {
            if (req.connection != null) req.connection.setTimeout(1000);
            theProcessor.handle(req.body);
            return res.send(201);
        });
        return this.server.listen(port, callback);
    };

    return CommandServer;

})();

module.exports = CommandServer;
