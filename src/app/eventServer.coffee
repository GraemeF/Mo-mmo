util = require "util"
log = require '../logger'

allEvents = ['characterCreated']

class EventServer
	constructor: (@io, @domainEvents) ->

	listen: (port) ->
		@server = @io.listen port

		for eventName in allEvents
			@domainEvents.subscribe eventName, (data) =>
				log.debug "EventServer emitting #{eventName}", data
				@server.emit eventName, data

module.exports = EventServer