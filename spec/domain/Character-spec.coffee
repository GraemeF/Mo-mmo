Character = require "../../lib/domain/Character"
log = require "../../lib/logger"
{Feature} = require "vows-bdd"
vows = require 'vows'
assert = require 'assert'

newChar = null

Feature("Character", module)
	.scenario("Create a new character")

	.given "nothing", ->
		process.nextTick @callback

	.when "I create a new character", ->
		newChar = new Character 1, "bob"
		process.nextTick @callback

	.then "it should add a characterCreated event to the character's uncommitted events", ->
		event = newChar.uncommittedEvents[0]
		assert.equal event.name, "characterCreated"
		assert.equal event.data.id, 1
		assert.equal event.data.name, "bob"

	.complete()
	.finish(module)