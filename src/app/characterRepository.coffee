log = require "../logger"

class CharacterRepository
	constructor: (@eventStore, @domainEvents, @Character = require "../../lib/domain/Character") ->

	storeCharacter: (character) ->
		@eventStore.append character.uncommittedEvents
		@domainEvents.publish character.uncommittedEvents
		character.uncommittedEvents = []

	getCharacter: (id) ->
		new @Character @eventStore.events

module.exports = CharacterRepository