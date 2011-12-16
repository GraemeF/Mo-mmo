var CommandProcessor, CommandServer, Feature, Sinon, command, express, fakeCommandProcessor, fakeExpressServer, postReceiver, processor, vows;

Feature = require("vows-bdd").Feature;

vows = require('vows');

Sinon = require("sinon");

express = require("express");

CommandServer = require('../../../lib/app/commandServer');

CommandProcessor = require('../../../lib/app/commandProcessor');

fakeExpressServer = function() {
  var stubServer;
  stubServer = express.createServer();
  Sinon.stub(stubServer, "listen");
  stubServer.listen.callsArg(1);
  return stubServer;
};

fakeCommandProcessor = function() {
  var stubProcessor;
  stubProcessor = new CommandProcessor();
  Sinon.stub(stubProcessor, "handle");
  return stubProcessor;
};

command = null;

processor = null;

postReceiver = null;

Feature("commandServer", module).scenario("Receive a command").given("a command", function() {
  command = {
    name: "foo",
    data: "bar"
  };
  return this.callback();
}).and("there is a listening command server", function() {
  var commandServer, server;
  var _this = this;
  server = fakeExpressServer();
  Sinon.stub(server, "post", function(path, func) {
    return postReceiver = func;
  });
  processor = fakeCommandProcessor();
  commandServer = new CommandServer(server, processor);
  return commandServer.listen("some port", this.callback);
}).when("it receives a POSTed command", function() {
  postReceiver({
    body: command
  }, {
    send: new Sinon.spy()
  });
  return this.callback();
}).then("it should hand the command to the processor for processing", function() {
  return Sinon.assert.calledWith(processor.handle, command);
}).complete().finish(module);
