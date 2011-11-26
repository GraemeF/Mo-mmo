log = require "../logger"
log.debug "Loading #{__filename}"

class CharacterRepository
	constructor: (@eventStore, @domainEvents) ->
		if !(@eventStore?) then log.warn "missing event store"

	addCharacter: (character, callback) ->
		@eventStore.append character.uncommittedEvents
		@domainEvents.publish character.uncommittedEvents
		callback()

module.exports = CharacterRepository