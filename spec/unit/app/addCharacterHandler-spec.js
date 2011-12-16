var AddCharacterHandler, Feature, Sinon, assert, log, vows;

log = require('../../../lib/logger');

Feature = require("vows-bdd").Feature;

vows = require('vows');

assert = require('assert');

Sinon = require("sinon");

AddCharacterHandler = require("../../../lib/app/addCharacterHandler");

Feature("addCharacterHandler", module).scenario("Add a new character").given("an empty character repository", function() {
  this.repo = {
    storeCharacter: Sinon.spy()
  };
  return this.callback();
}).and("an add character command", function() {
  this.command = {
    name: "addCharacter",
    data: {
      id: 1,
      name: "bob"
    }
  };
  return this.callback();
}).and("an AddCharacterHandler", function() {
  this.handler = new AddCharacterHandler(this.repo);
  return this.callback();
}).when("I handle the addCharacter command", function() {
  this.handler.handle(this.command);
  return this.callback();
}).then("it should store the new character to the repository", function() {
  var addedCharacter, call;
  Sinon.assert.called(this.repo.storeCharacter);
  call = this.repo.storeCharacter.getCall(0);
  addedCharacter = call.args[0];
  assert.equal(addedCharacter.name, "bob");
  return assert.equal(addedCharacter.id, 1);
}).complete().finish(module);
