log = require "../logger"
events = require 'events'

class DomainEvents
	constructor: ->
		@emitter = new events.EventEmitter()

	publish: (publishedEvents) ->
		log.debug "Publishing events.", publishedEvents
		for event in publishedEvents
			log.debug "DomainEvents emitting", event
			@emitter.emit event.name, event.data

	subscribe: (eventName, handler) ->
		log.debug "Subscribing to DomainEvent #{eventName}."
		@emitter.on eventName, handler

module.exports = DomainEvents
