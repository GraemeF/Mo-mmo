{Feature} = require "vows-bdd"
{logger, Character, Events} = require "./helpers"
vows = require 'vows'
assert = require 'assert'

Feature("Character management", module)
	.scenario("Create a new character")
	.given "I am watching for character 1 to be created", ->
		Events.subscribe "characterCreated", (data) ->
			assert.equal data.id, 1
			assert.equal data.name, "bob"
		process.nextTick @callback
	.when "I create a new character", ->
		Character.create 1, "bob", @callback
	.then "a characterCreated event should be published", ->
		Events.characterShouldBeCreated 1, @callback
	.complete()

	.finish module