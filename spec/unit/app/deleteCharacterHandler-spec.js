var DeleteCharacterHandler, Feature, Sinon, assert, fakeCharacter, fakeRepo, log, vows;

log = require('../../../lib/logger');

Feature = require("vows-bdd").Feature;

vows = require('vows');

assert = require('assert');

Sinon = require("sinon");

DeleteCharacterHandler = require("../../../lib/app/deleteCharacterHandler");

fakeCharacter = {
  "delete": Sinon.spy()
};

fakeRepo = {
  getCharacter: function(id) {
    if (id === 1) {
      return fakeCharacter;
    } else {
      return null;
    }
  },
  storeCharacter: Sinon.spy()
};

Feature("deleteCharacterHandler", module).scenario("Delete a character").given("a character repository with character 1", function() {
  return this.callback();
}).and("a delete character command", function() {
  this.command = {
    name: "deleteCharacter",
    data: {
      id: 1
    }
  };
  return this.callback();
}).and("a DeleteCharacterHandler", function() {
  this.handler = new DeleteCharacterHandler(fakeRepo);
  return this.callback();
}).when("I handle the deleteCharacter command", function() {
  this.handler.handle(this.command);
  return this.callback();
}).then("it should delete the character", function() {
  return Sinon.assert.called(fakeCharacter["delete"]);
}).and("it should store the character in the repository", function() {
  return Sinon.assert.calledWith(fakeRepo.storeCharacter, fakeCharacter);
}).complete().finish(module);
