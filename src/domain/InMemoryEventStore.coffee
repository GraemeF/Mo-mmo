log = require "../logger"
log.debug "Loading #{__filename}"

class InMemoryEventStore
	constructor: ->
		@events = []

	append: (newEvents) ->
		log.debug "Adding #{JSON.stringify newEvents} to the event store."
		for event in newEvents
			@events.push event

module.exports = InMemoryEventStore