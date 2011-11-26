log = require "../logger"
log.debug "Loading #{__filename}"

class InMemoryEventStore
	constructor: ->
		@events = []

	append: (newEvents) ->
		for event in newEvents
			@events.push event

module.exports = InMemoryEventStore