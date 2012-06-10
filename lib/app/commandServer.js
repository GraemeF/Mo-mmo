var express = require("express");

var CommandServer = function (server, processor) {
    this.server = server;
    this.processor = processor;
};

CommandServer.prototype.listen = function (port, callback) {
    this.server.use(express.logger("dev"));
    this.server.use(express.static(__dirname + '/../ui'));
    this.server.use(express.bodyParser());
    var theProcessor = this.processor;
    this.server.post('/commands', function (req, res) {
        if (req.connection != null) {
            req.connection.setTimeout(1000);
        }
        theProcessor.handle(req.body);
        res.send(201);
    });
    this.server.listen(port, callback);
};

module.exports = CommandServer;
