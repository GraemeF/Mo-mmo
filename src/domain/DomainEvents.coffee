events = require 'events'

class DomainEvents extends events.EventEmitter
	publish: (publishedEvents) ->
		for event in publishedEvents
			@emit event.name, event.data

module.exports = DomainEvents
