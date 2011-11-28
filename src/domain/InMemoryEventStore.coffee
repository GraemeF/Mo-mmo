util = require "util"
log = require "../logger"

class InMemoryEventStore
	constructor: ->
		@events = []

	append: (newEvents) ->
		for event in newEvents
			@events.push event

module.exports = InMemoryEventStore