log = require "../logger"
log.debug "Loading #{__filename}"

class CharacterRepository
	constructor: (@eventStore, @domainEvents) ->

	addCharacter: (character, callback) ->
		@eventStore.append character.uncommittedEvents
		@domainEvents.publish character.uncommittedEvents
		callback()

module.exports = CharacterRepository