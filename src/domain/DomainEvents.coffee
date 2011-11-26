events = require 'events'

class DomainEvents extends events.EventEmitter
	publish: (event) ->
		@emit event.name, event.data

module.exports = DomainEvents
