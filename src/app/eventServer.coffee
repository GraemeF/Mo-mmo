util = require "util"
log = require '../logger'

allEvents = ['characterCreated']

class EventServer
	constructor: (@server, @domainEvents) ->
		@hasConnection = false
		@server.sockets.on "connection", (socket) =>
			log.info "Connection established"
			@hasConnection = true

	waitForConnection: (callback) ->
		if !@hasConnection
			process.nextTick ()=>@waitForConnection(callback)
		else
			callback()

	publishDomainEvents: ->
		for eventName in allEvents
			@domainEvents.subscribe eventName, (data) =>
				log.debug "EventServer emitting #{eventName}", data
				@server.emit eventName, data

module.exports = EventServer