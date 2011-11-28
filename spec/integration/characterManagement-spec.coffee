{Feature} = require "vows-bdd"
{log, Character, Events} = require "./helpers"
vows = require 'vows'
assert = require 'assert'

IHaveConnectedToTheServer = ->
	[
		"I have connected to the server",
		->
			@receivedEvents = {}
			Events.connectClientToServer @callback
	]

ICreateCharacter_Named_ = (id, name) ->
	[
		"I create character #{id} named '#{name}'",
		->
			Character.create 1, "bob", @callback
	]

IDeleteCharacter_ = (id) ->
	[
		"I delete character #{id}",
		->
			Character.delete 1, @callback
	]

IShouldReceiveACharacterCreatedEventForCharacter_Named_ = (id, name) ->
	[
		"I should receive a character created event for character #{id} named '#{name}'",
		->
			event = @receivedEvents.characterCreated[0]
			assert.equal event.id, id
			assert.equal event.name, name
	]

IShouldReceiveACharacterDeletedEventForCharacter_ = (id) ->
	[
		"I should receive a character deleted event for character #{id}",
		->
			event = @receivedEvents.characterDeleted[0]
			assert.equal event.id, id
	]

Feature("Character management", module)
	.scenario("Create a new character")
	.given(IHaveConnectedToTheServer())
	.and(Events.IAmSubscribedTo "characterCreated")
	.when(ICreateCharacter_Named_ 1, 'bob')
	.then(IShouldReceiveACharacterCreatedEventForCharacter_Named_ 1, 'bob')
	.complete()

	.scenario("Delete a character")
	.given(IHaveConnectedToTheServer())
	.and(Events.IAmSubscribedTo "characterDeleted")
	.when(ICreateCharacter_Named_ 1, 'bob')
	.and(IDeleteCharacter_ 1)
	.then(IShouldReceiveACharacterDeletedEventForCharacter_ 1)
	.complete()

	.finish module