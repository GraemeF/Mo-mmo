util = require "util"
log = require '../logger'

allEvents = ['characterCreated']

class EventServer
	constructor: (@server, @domainEvents) ->
		@hasConnection = false
		@server.sockets.on "connection", (socket) =>
			@hasConnection = true

	waitForConnection: (callback) ->
		if !@hasConnection
			process.nextTick ()=>@waitForConnection(callback)
		else
			callback()

	publishDomainEvents: ->
		theServer = @server
		for eventName in allEvents
			@domainEvents.subscribe eventName, (data) =>
				log.debug "EventServer emitting #{eventName}", data
				theServer.sockets.emit eventName, data

module.exports = EventServer