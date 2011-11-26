log = require "../logger"
log.debug "Loading #{__filename}"
events = require 'events'

class DomainEvents extends events.EventEmitter
	publish: (publishedEvents) ->
		log.debug "Publishing #{JSON.stringify publishedEvents}."
		for event in publishedEvents
			@emit event.name, event.data

module.exports = DomainEvents
