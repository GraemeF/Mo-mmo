var CommandSink, Mommo, characterRepo, client, commandProcessor, commandServer, domainEvents, eventStore, express, log, port, request, server, util, wait;

util = require("util");

express = require("express");

request = require('request');

log = require("../../../lib/logger");

Mommo = require("../../../lib");

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

port = 3004;

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

commandServer.ready(wait);

CommandSink = (function() {

  function CommandSink(baseUri) {
    this.baseUri = baseUri;
  }

  CommandSink.prototype.send = function(command, callback) {
    var uri;
    uri = this.baseUri + "commands";
    return request.post({
      uri: uri,
      json: command
    }, function(error, response, body) {
      if (!(error != null)) if (response.statusCode !== 201) error = body;
      if (error != null) {
        log.error("There was a problem sending a command.", error);
      }
      return process.nextTick(function() {
        return callback(error, response);
      });
    });
  };

  return CommandSink;

})();

client = new CommandSink("http://localhost:" + port + "/");

module.exports = {
  send: function(command, callback) {
    return client.send(command, callback);
  },
  domainEvents: domainEvents,
  server: server,
  port: port
};
