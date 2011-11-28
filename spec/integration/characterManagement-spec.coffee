{Feature} = require "vows-bdd"
{log, Character, Events} = require "./helpers"
vows = require 'vows'
assert = require 'assert'

receivedEvents = null

Feature("Character management", module)
	.scenario("Create a new character")
	.given "we have not received any events", ->
		receivedEvents = []
		process.nextTick @callback
	.and "the event client has connected to the server", ->
		Events.connectClientToServer @callback
	.and "I am watching for character 1 to be created", ->
		Events.subscribe "characterCreated", (data) ->
			receivedEvents.push data
		process.nextTick @callback
	.when "I create a new character", ->
		Character.create 1, "bob", @callback
	.and "I wait for the event", ->
		Events.waitFor (() -> receivedEvents.length > 0), 20, @callback
	.then "a characterCreated event should be published", ->
		assert.equal receivedEvents[0].id, 1
		assert.equal receivedEvents[0].name, 'bob'
	.complete()

	.finish module