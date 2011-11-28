Character = require "../../../lib/domain/Character"
log = require "../../../lib/logger"
{Feature} = require "vows-bdd"
vows = require 'vows'
assert = require 'assert'

newChar = null

Feature("Character", module)
	.scenario("Create a new character")

	.when "I create a new character", ->
		newChar = new Character 1, "bob"
		process.nextTick @callback

	.then "it should add a characterCreated event to the character's uncommitted events", ->
		event = newChar.uncommittedEvents[0]
		assert.equal event.name, "characterCreated"
		assert.equal event.data.id, 1
		assert.equal event.data.name, "bob"

	.complete()

	.scenario("Delete a character")

	.given "I create a new character", ->
		newChar = new Character 1, "bob"
		process.nextTick @callback

	.when "I delete the character", ->
		newChar.delete()
		process.nextTick @callback

	.then "it should add a characterDeleted event to the character's uncommitted events", ->
		event = newChar.uncommittedEvents[1]
		assert.equal event.name, "characterDeleted"
		assert.equal event.data.id, 1

	.complete()
	.finish(module)