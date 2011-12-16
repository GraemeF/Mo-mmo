var CommandProcessor, Feature, Sinon, assert, fakeHandlerFactory, fooCommand, fooHandler, fooHandlerFactory, log, processor, thrownError, vows;

Feature = require("vows-bdd").Feature;

vows = require('vows');

Sinon = require("sinon");

assert = require("assert");

log = require("../../../lib/logger");

CommandProcessor = require("../../../lib/app/commandProcessor");

fakeHandlerFactory = function(handler) {};

processor = null;

thrownError = null;

fooHandler = {
  handle: function(command) {}
};

fooHandlerFactory = {
  createHandler: function() {
    return fooHandler;
  }
};

fooCommand = {
  name: "foo",
  data: "bar"
};

Feature("commandProcessor", module).scenario("Process a known command").given("a command processor", function() {
  processor = new CommandProcessor();
  return this.callback();
}).and("there is handler for foo commands", function() {
  Sinon.spy(fooHandler, "handle");
  Sinon.spy(fooHandlerFactory, "createHandler");
  processor.handlerFactories.foo = fooHandlerFactory;
  return this.callback();
}).when("it is asked to handle a command", function() {
  processor.handle(fooCommand);
  return this.callback();
}).then("it should create the appropriate handler", function() {
  return Sinon.assert.called(fooHandlerFactory.createHandler);
}).and("it should ask the handler to handle the command", function() {
  return Sinon.assert.calledWith(fooHandler.handle, fooCommand);
}).complete().scenario("Process an unknown command").given("a command processor", function() {
  processor = new CommandProcessor();
  assert.isEmpty(processor.handlerFactories);
  return this.callback();
}).when("it is asked to handle an unknown command", function() {
  try {
    processor.handle(fooCommand);
  } catch (error) {
    thrownError = error;
  }
  return this.callback();
}).then("it should throw an error", function() {
  return assert.equal(thrownError, "There is no registered handler for 'foo' commands.");
}).complete().finish(module);
