var DomainEvents, Feature, assert, domainEvents, eventData, listener, log, sinon, vows;

DomainEvents = require("../../../lib/domain/DomainEvents");

log = require("../../../lib/logger");

Feature = require("vows-bdd").Feature;

vows = require('vows');

assert = require('assert');

sinon = require('sinon');

domainEvents = null;

listener = null;

eventData = {
  bar: "baz"
};

Feature("DomainEvents", module).scenario("Publish and subscribe to an event").given("domain events", function() {
  domainEvents = new DomainEvents();
  return this.callback();
}).and("I am subscribed to the foo event", function() {
  listener = new sinon.spy();
  domainEvents.subscribe("foo", listener);
  return this.callback();
}).when("I publish a foo event", function() {
  domainEvents.publish([
    {
      name: "foo",
      data: eventData
    }
  ]);
  return this.callback();
}).then("the listener should be called with the event data", function() {
  var actualData, call;
  sinon.assert.called(listener);
  call = listener.getCall(0);
  actualData = call.args[0];
  return assert.equal(actualData, eventData);
}).complete().finish(module);
