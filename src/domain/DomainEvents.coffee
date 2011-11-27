log = require "../logger"
events = require 'events'

class DomainEvents
	constructor: ->
		@emitter = new events.EventEmitter()

	publish: (publishedEvents) ->
		log.debug "Publishing events.", publishedEvents
		for event in publishedEvents
			@emitter.emit event.name, event.data

	subscribe: (eventName, handler) ->
		@emitter.on eventName, handler

module.exports = DomainEvents
