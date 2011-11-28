log = require "../logger"

class CharacterRepository
	constructor: (@eventStore, @domainEvents, @Character = require "../../lib/domain/Character") ->

	storeCharacter: (character) ->
		log.debug "Storing character in the repository.", character
		@eventStore.append character.uncommittedEvents
		@domainEvents.publish character.uncommittedEvents
		character.uncommittedEvents = []

	getCharacter: (id) ->
		log.debug "Getting character #{id} from the repository."
		new @Character id, @eventStore.events

module.exports = CharacterRepository