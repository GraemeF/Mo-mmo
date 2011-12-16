var ACharacterRepository, ADomainEventsPublisher, AnEventStoreWithEvents_, CharacterRepository, FakeCharacter, Feature, Sinon, assert, assertSpyWasCalledWithEvents, character, domainEvents, eventsInStore, expectedCommits, fakeEventStore, log, repo, someEvents, util, vows;
var _this = this;

util = require("util");

log = require('../../../lib/logger');

Feature = require("vows-bdd").Feature;

vows = require('vows');

assert = require('assert');

Sinon = require("sinon");

CharacterRepository = require("../../../lib/app/characterRepository");

FakeCharacter = (function() {

  function FakeCharacter(events) {
    this.events = events;
  }

  return FakeCharacter;

})();

repo = null;

character = null;

domainEvents = null;

someEvents = null;

fakeEventStore = null;

expectedCommits = null;

eventsInStore = null;

ACharacterRepository = function() {
  return [
    "a character repository", function() {
      repo = new CharacterRepository(fakeEventStore, domainEvents, FakeCharacter);
      return this.callback();
    }
  ];
};

ADomainEventsPublisher = function() {
  return [
    "a domain events publisher", function() {
      domainEvents = {
        publish: Sinon.spy()
      };
      return this.callback();
    }
  ];
};

AnEventStoreWithEvents_ = function(events) {
  return [
    "an event store with events " + (JSON.stringify(events)), function() {
      character = null;
      eventsInStore = events;
      fakeEventStore = {
        append: Sinon.spy(),
        events: events
      };
      return this.callback();
    }
  ];
};

assertSpyWasCalledWithEvents = function(spy, expectedEvents) {
  var actualEvents, call;
  Sinon.assert.called(spy);
  call = spy.getCall(0);
  actualEvents = call.args[0];
  return assert.equal(actualEvents, expectedEvents);
};

Feature("CharacterRepository", module).scenario("Add a new character").given(AnEventStoreWithEvents_([])).and(ADomainEventsPublisher()).and(ACharacterRepository()).and("a character with an uncommitted event", function() {
  expectedCommits = [
    {
      name: "some event"
    }
  ];
  character = {
    id: 1,
    uncommittedEvents: expectedCommits
  };
  return this.callback();
}).when("I add a character to the repository", function() {
  repo.storeCharacter(character);
  return this.callback();
}).then("it should append the uncommitted events to the event store", function() {
  return assertSpyWasCalledWithEvents(fakeEventStore.append, expectedCommits);
}).and("it should publish the events", function() {
  return assertSpyWasCalledWithEvents(domainEvents.publish, expectedCommits);
}).complete().scenario("Store a character").given(AnEventStoreWithEvents_([])).and(ADomainEventsPublisher()).and(ACharacterRepository()).and("a character with an uncommitted event", function() {
  character = {
    id: 1,
    uncommittedEvents: expectedCommits
  };
  return this.callback();
}).when("I store a character to the repository", function() {
  repo.storeCharacter(character);
  return this.callback();
}).then("it should append the uncommitted events to the event store", function() {
  return assertSpyWasCalledWithEvents(fakeEventStore.append, expectedCommits);
}).and("it should publish the events", function() {
  return assertSpyWasCalledWithEvents(domainEvents.publish, expectedCommits);
}).and("it should clear the uncommitted events", function() {
  return assert.isEmpty(character.uncommittedEvents);
}).complete().scenario("Get a character").given(AnEventStoreWithEvents_([
  {
    name: "some event",
    data: "some data"
  }
])).and(ADomainEventsPublisher()).and(ACharacterRepository()).when("I get a character from the repository", function() {
  character = repo.getCharacter(1);
  return this.callback();
}).then("it should get a character with the loaded events", function() {
  return assert.equal(character.events, eventsInStore);
}).complete().finish(module);
