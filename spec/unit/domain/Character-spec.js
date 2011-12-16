var Character, Character_IsCreatedWithName_, EnsureStubsExist, Feature, IMoveTheCharacterTowards_, LocationAt_IsCalculatedAs_, TheTimeIs_, assert, log, sinon, util, vows;

Character = require("../../../lib/domain/Character");

log = require("../../../lib/logger");

Feature = require("vows-bdd").Feature;

vows = require('vows');

assert = require('assert');

sinon = require('sinon');

util = require('util');

EnsureStubsExist = function(owner) {
  owner.movement || (owner.movement = {
    calculateLocation: sinon.stub()
  });
  return owner.now || (owner.now = sinon.stub());
};

Character_IsCreatedWithName_ = function(id, name) {
  return [
    "Character " + id + " is created with name " + name, function() {
      EnsureStubsExist(this);
      this.character = new Character(1, "bob", this.movement, this.now);
      return this.callback();
    }
  ];
};

TheTimeIs_ = function(time) {
  return [
    "the time is " + time, function() {
      EnsureStubsExist(this);
      this.now.returns(time);
      return this.callback();
    }
  ];
};

LocationAt_IsCalculatedAs_ = function(time, location) {
  return [
    "the location at " + time + " is calculated as " + location, function() {
      EnsureStubsExist(this);
      this.movement.calculateLocation.returns(location);
      return this.callback();
    }
  ];
};

IMoveTheCharacterTowards_ = function(destination) {
  return [
    "I move the character towards " + destination, function() {
      this.trackMovementCallback = sinon.spy();
      this.character.move(destination, this.trackMovementCallback);
      return this.callback();
    }
  ];
};

Feature("Character", module).scenario("Create a new character").when(Character_IsCreatedWithName_(1, "bob")).then("it should add a characterCreated event to the character's uncommitted events", function() {
  var event;
  event = this.character.uncommittedEvents[0];
  assert.equal(event.name, "characterCreated");
  assert.equal(event.data.id, 1);
  return assert.equal(event.data.name, "bob");
}).complete().scenario("Move a character").given(TheTimeIs_(10000)).and(Character_IsCreatedWithName_(1, "bob")).and(LocationAt_IsCalculatedAs_(11000, [4, 5, 6])).when(IMoveTheCharacterTowards_([1, 2, 3])).and(TheTimeIs_(11000)).then("it should add a characterMoving event to the character's uncommitted events", function() {
  var event;
  event = this.character.uncommittedEvents[1];
  assert.equal(event.name, "characterMoving");
  assert.equal(event.data.id, 1);
  assert.equal(event.data.movement.startTime, 10000);
  assert.deepEqual(event.data.movement.source, [0, 0, 0]);
  return assert.deepEqual(event.data.movement.destination, [1, 2, 3]);
}).and("it should add a characterMoved event to the character's uncommitted events", function() {
  var event;
  event = this.character.uncommittedEvents[2];
  assert.equal(event.name, "characterMoved");
  assert.equal(event.data.id, 1);
  return assert.deepEqual(event.data.location, [4, 5, 6]);
}).and("it should call the callback when movement is tracked", function() {
  return assert.isTrue(this.trackMovementCallback.called);
}).complete().scenario("Delete a character").given(Character_IsCreatedWithName_(1, "bob")).when("I delete the character", function() {
  this.character["delete"]();
  return this.callback();
}).then("it should add a characterDeleted event to the character's uncommitted events", function() {
  var event;
  event = this.character.uncommittedEvents[1];
  assert.equal(event.name, "characterDeleted");
  return assert.equal(event.data.id, 1);
}).complete().scenario("Load a character from events").given("a characterCreated event", function() {
  this.events = [
    {
      name: "characterCreated",
      data: {
        id: 1,
        name: "bob"
      }
    }
  ];
  return this.callback();
}).when("I create a character with the event", function() {
  this.character = new Character(this.events);
  return this.callback();
}).then("the character should have the name and id from the event", function() {
  assert.equal(this.character.name, "bob");
  return assert.equal(this.character.id, 1);
}).complete().finish(module);
