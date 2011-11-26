DomainEvents = require "../../../lib/domain/DomainEvents"
log = require "../../../lib/logger"
{Feature} = require "vows-bdd"
vows = require 'vows'
assert = require 'assert'
sinon = require 'sinon'

domainEvents = null
listener = null
eventData = {bar: "baz"}

Feature("DomainEvents", module)
	.scenario("Publish and subscribe to an event")

	.given "domain events", ->
		domainEvents = new DomainEvents()
		process.nextTick @callback
	.and "I am subscribed to the foo event", ->
		listener = new sinon.spy()
		domainEvents.on "foo", listener
		process.nextTick @callback

	.when "I publish a foo event", ->
		domainEvents.publish {name: "foo", data: eventData}
		process.nextTick @callback

	.then "the listener should be called with the event data", ->
		sinon.assert.called listener
		call = listener.getCall 0
		actualData = call.args[0]
		assert.equal actualData, eventData

	.complete()
	.finish(module)