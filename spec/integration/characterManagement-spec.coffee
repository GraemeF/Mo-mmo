{Feature} = require "vows-bdd"
{log, Character, Events} = require "./helpers"
vows = require 'vows'
assert = require 'assert'

receivedEvents = null

IHaveConnectedToTheServer = ->
	[
		"I have connected to the server",
		->
			receivedEvents = {}
			Events.connectClientToServer @callback
	]

ICreateCharacter_Named_ = (id, name) ->
	[
		"I create character #{id} named '#{name}'",
		->
			Character.create 1, "bob", @callback
	]

IAmSubscribedTo_Events = (eventName) ->
	[
		"I am subscribed to #{eventName} events",
		->
			receivedEvents[eventName] = []
			Events.subscribe eventName, (data) ->
				receivedEvents[eventName].push data
			process.nextTick @callback
	]

IShouldReceiveACharacterCreatedEventForCharacter_Named_ = (id, name) ->
	[
		"I should receive a character created event for character #{id} named '#{name}'",
		->
			event = receivedEvents.characterCreated[0]
			assert.equal event.id, id
			assert.equal event.name, name
	]

Feature("Character management", module)
	.scenario("Create a new character")
	.given(IHaveConnectedToTheServer())
	.and(IAmSubscribedTo_Events "characterCreated")
	.when(ICreateCharacter_Named_ 1, 'bob')
	.then(IShouldReceiveACharacterCreatedEventForCharacter_Named_ 1, 'bob')
	.complete()

	.finish module