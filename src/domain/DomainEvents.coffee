log = require "../logger"
events = require 'events'

class DomainEvents extends events.EventEmitter
	publish: (publishedEvents) ->
		log.debug "Publishing events.", publishedEvents
		for event in publishedEvents
			@emit event.name, event.data

module.exports = DomainEvents
