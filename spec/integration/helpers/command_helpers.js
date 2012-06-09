var util = require("util");
var express = require("express");
var request = require('request');
var log = require("../../../lib/logger");
var Mommo = require("../../../lib");
var server = express.createServer();
var eventStore = new Mommo.Domain.InMemoryEventStore();
var domainEvents = new Mommo.Domain.DomainEvents();
var characterRepo = new Mommo.App.CharacterRepository(eventStore, domainEvents);
var commandProcessor = new Mommo.App.CommandProcessor();

commandProcessor.handlerFactories.addCharacter = {
    createHandler: function () {
        return new Mommo.App.AddCharacterHandler(characterRepo);
    }
};

commandProcessor.handlerFactories.deleteCharacter = {
    createHandler: function () {
        return new Mommo.App.DeleteCharacterHandler(characterRepo);
    }
};

commandProcessor.handlerFactories.moveCharacter = {
    createHandler: function () {
        return new Mommo.App.MoveCharacterHandler(characterRepo);
    }
};

var commandServer = new Mommo.App.CommandServer(server, commandProcessor);

var port = 3004;

commandServer.ready = function (callback) {
    if (this.active) {
        process.nextTick(callback);
    } else {
        this.active = true;
    }
    commandServer.listen(port);
    process.nextTick(callback);
};

process.on("exit", function () {
    if (this.active) {
        return commandServer.close();
    }
});

var wait = function () {
    if (!this.active) {
        process.nextTick(wait);
    }
};

commandServer.ready(wait);

var CommandSink = function (baseUri) {
    this.baseUri = baseUri;
};

CommandSink.prototype.send = function (command, callback) {
    request.post({
                     uri: this.baseUri + "commands",
                     json: command
                 },
                 function (error, response, body) {
                     if (error === null) {
                         if (response.statusCode !== 201) {
                             error = body;
                         }
                     }
                     else {
                         log.error("There was a problem sending a command.", error);
                     }
                     process.nextTick(function () {
                         callback(error, response);
                     });
                 });
};

var client = new CommandSink("http://localhost:" + port + "/");

module.exports = {
    send: function (command, callback) {
        return client.send(command, callback);
    },
    domainEvents: domainEvents,
    server: server,
    port: port
};
