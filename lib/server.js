var util = require("util");
var express = require("express");
var request = require('request');
var io = require('socket.io');
var log = require("./logger");
var Mommo = require("./index");

var server = express.createServer();
var eventStore = new Mommo.Domain.InMemoryEventStore();
var domainEvents = new Mommo.Domain.DomainEvents();
var characterRepo = new Mommo.App.CharacterRepository(eventStore, domainEvents);
var commandProcessor = new Mommo.App.CommandProcessor();

commandProcessor.handlerFactories.addCharacter = {
    createHandler:function () {
        return new Mommo.App.AddCharacterHandler(characterRepo);
    }
};

commandProcessor.handlerFactories.deleteCharacter = {
    createHandler:function () {
        return new Mommo.App.DeleteCharacterHandler(characterRepo);
    }
};

commandProcessor.handlerFactories.moveCharacter = {
    createHandler:function () {
        return new Mommo.App.MoveCharacterHandler(characterRepo);
    }
};

var port = 3003;

var ioServer = io.listen(server);

var eventServer = new Mommo.App.EventServer(ioServer, domainEvents);
eventServer.publishDomainEvents();

var commandServer = new Mommo.App.CommandServer(server, commandProcessor);
commandServer.listen(port, function () {
    console.log("Ready.");
});