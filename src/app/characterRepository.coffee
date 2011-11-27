log = require "../logger"

class CharacterRepository
	constructor: (@eventStore, @domainEvents) ->

	addCharacter: (character) ->
		log.debug "Adding character to the repository.", character
		@eventStore.append character.uncommittedEvents
		@domainEvents.publish character.uncommittedEvents

module.exports = CharacterRepository