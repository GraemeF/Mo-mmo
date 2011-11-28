log = require "../logger"

class CharacterRepository
	constructor: (@eventStore, @domainEvents, @Character = require "../../lib/domain/Character") ->

	addCharacter: (character) ->
		log.debug "Adding character to the repository.", character
		@eventStore.append character.uncommittedEvents
		@domainEvents.publish character.uncommittedEvents

	getCharacter: (id) ->
		log.debug "Getting character #{id} from the repository."
		new @Character id, @eventStore.events

module.exports = CharacterRepository