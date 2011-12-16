var Mommo, characterRepo, commandProcessor, commandServer, domainEvents, eventServer, eventStore, express, io, ioServer, log, port, request, server, util, wait;

util = require("util");

express = require("express");

request = require('request');

io = require('socket.io');

log = require("./logger");

Mommo = require("./index");

server = express.createServer();

eventStore = new Mommo.Domain.InMemoryEventStore();

domainEvents = new Mommo.Domain.DomainEvents();

characterRepo = new Mommo.App.CharacterRepository(eventStore, domainEvents);

commandProcessor = new Mommo.App.CommandProcessor();

commandProcessor.handlerFactories.addCharacter = {
  createHandler: function() {
    return new Mommo.App.AddCharacterHandler(characterRepo);
  }
};

commandProcessor.handlerFactories.deleteCharacter = {
  createHandler: function() {
    return new Mommo.App.DeleteCharacterHandler(characterRepo);
  }
};

commandProcessor.handlerFactories.moveCharacter = {
  createHandler: function() {
    return new Mommo.App.MoveCharacterHandler(characterRepo);
  }
};

commandServer = new Mommo.App.CommandServer(server, commandProcessor);

port = 3003;

commandServer.ready = function(callback) {
  if (this.active) {
    process.nextTick(callback);
  } else {
    this.active = true;
  }
  commandServer.listen(port);
  process.nextTick(callback);
};

process.on("exit", function() {
  if (this.active) return commandServer.close();
});

wait = function() {
  if (!this.active) {
    return process.nextTick(wait);
  } else {

  }
};

ioServer = io.listen(server);

ioServer.configure(function() {
  return ioServer.disable('log');
});

ioServer.configure('test', function() {
  ioServer.set('transports', ['xhr-polling']);
  return ioServer.disable('log');
});

eventServer = new Mommo.App.EventServer(ioServer, domainEvents);

eventServer.publishDomainEvents();

commandServer.ready(wait);
