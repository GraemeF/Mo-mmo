InMemoryEventStore = require "../../../lib/domain/InMemoryEventStore"
log = require "../../../lib/logger"
{Feature} = require "vows-bdd"
vows = require 'vows'
assert = require 'assert'

store = null

Feature("InMemoryEventStore", module)
	.scenario("Add an event")

	.given "a new event store", ->
		store = new InMemoryEventStore()
		process.nextTick @callback

	.when "I append an event", ->
		store.append [{name: "foo", data: "bar"}]
		process.nextTick @callback

	.then "the list of events should contain the event", ->
		event = store.events[0]
		assert.equal event.name, "foo"
		assert.equal event.data, "bar"

	.complete()
	.finish(module)