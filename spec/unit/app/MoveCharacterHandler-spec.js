var Feature, MoveCharacterHandler, Sinon, assert, log, vows;

log = require('../../../lib/logger');

Feature = require("vows-bdd").Feature;

vows = require('vows');

assert = require('assert');

Sinon = require("sinon");

MoveCharacterHandler = require("../../../lib/app/MoveCharacterHandler");

Feature("MoveCharacterHandler", module).scenario("Begin moving a character").given("the repository contains a character at 0,0,0", function() {
  var _this = this;
  this.character = {
    location: [0, 0, 0],
    move: Sinon.spy()
  };
  this.repo = {
    getCharacter: function(id) {
      if (id === 1) {
        return _this.character;
      } else {
        return null;
      }
    },
    storeCharacter: Sinon.spy()
  };
  return this.callback();
}).and("a command to move character 1 to 10,0,0", function() {
  this.targetLocation = [10, 0, 0];
  this.command = {
    name: "moveCharacter",
    data: {
      id: 1,
      location: this.targetLocation
    }
  };
  return this.callback();
}).and("a MoveCharacterHandler", function() {
  this.handler = new MoveCharacterHandler(this.repo);
  return this.callback();
}).when("I handle the moveCharacter command", function() {
  this.handler.handle(this.command);
  return this.callback();
}).then("it should move the character", function() {
  return Sinon.assert.calledWith(this.character.move, this.targetLocation);
}).complete().finish(module);
