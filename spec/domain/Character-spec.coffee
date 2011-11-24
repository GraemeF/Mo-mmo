Character = require "../../lib/domain/Character"
store = require "../../lib/domain/EventStore"
log = require "../../lib/logger"
{Feature} = require "vows-bdd"
vows = require 'vows'
assert = require 'assert'
Sinon = require "sinon"

Feature("Character", module)
	.scenario("Create a new character")

	.given "an empty event store", ->
		Sinon.spy store, "append"
		process.nextTick @callback

	.when "I create a new character", ->
		newChar = new Character 1, "bob"
		process.nextTick @callback

	.then "it should add characterCreated event to the event store", ->
		Sinon.assert.called store.append
		event = (store.append.getCall 0).args[0]
		assert.equal event.name, "characterCreated"
		assert.equal event.data.id, 1
		assert.equal event.data.name, "bob"

	.complete()
	.finish(module)