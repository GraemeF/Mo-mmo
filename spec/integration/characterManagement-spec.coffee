{Feature} = require "vows-bdd"
{logger, Character, Events} = require "./helpers"
vows = require 'vows'

Feature("Character management", module)
	.scenario("Create a new character")
	.when "I create a new character", ->
		Character.create 1, "bob", @callback
	.then "a characterCreated event should be published", ->
		Events.characterShouldBeCreated 1, @callback
	.complete()

	.finish module