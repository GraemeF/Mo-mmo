var Feature, InMemoryEventStore, assert, log, store, vows;

InMemoryEventStore = require("../../../lib/domain/InMemoryEventStore");

log = require("../../../lib/logger");

Feature = require("vows-bdd").Feature;

vows = require('vows');

assert = require('assert');

store = null;

Feature("InMemoryEventStore", module).scenario("Add an event").given("a new event store", function() {
  store = new InMemoryEventStore();
  return this.callback();
}).when("I append an event", function() {
  store.append([
    {
      name: "foo",
      data: "bar"
    }
  ]);
  return this.callback();
}).then("the list of events should contain the event", function() {
  var event;
  event = store.events[0];
  assert.equal(event.name, "foo");
  return assert.equal(event.data, "bar");
}).complete().finish(module);
