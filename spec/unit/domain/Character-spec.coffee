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

	.scenario("Load a character from events")

	.given "a characterCreated event", ->
		@events =
				[
					name:"characterCreated"
					data:
						id: 1
						name: "bob"
				]
		@callback()

	.when "I create a character with the event", ->
		@character = new Character @events
		@callback()

	.then "the character should have the name and id from the event", ->
		assert.equal @character.name, "bob"
		assert.equal @character.id, 1

	.complete()
	.finish(module)