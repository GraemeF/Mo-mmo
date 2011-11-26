log = require "../logger"
log.debug "Loading #{__filename}"

class CharacterRepository
	constructor: (@eventStore, @domainEvents) ->
		if !(@eventStore?) then log.warn "missing event store"

	addCharacter: (character) ->
		log.debug "Adding #{JSON.stringify character} to the repository."
		@eventStore.append character.uncommittedEvents
		@domainEvents.publish character.uncommittedEvents

module.exports = CharacterRepository