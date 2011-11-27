log = require "../logger"

class InMemoryEventStore
	constructor: ->
		@events = []

	append: (newEvents) ->
		log.debug "Appending events to the event store.", newEvents
		for event in newEvents
			@events.push event

module.exports = InMemoryEventStore