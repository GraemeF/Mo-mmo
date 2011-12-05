util = require "util"
log = require '../logger'

allEvents = ['characterCreated', 'characterDeleted', 'characterMoving', 'characterMoved']

class EventServer
	constructor: (@server, @domainEvents) ->
		@hasConnection = false
		@server.sockets.on "connection", (socket) =>
			@hasConnection = true

	waitForConnection: (callback) ->
		if !@hasConnection
			process.nextTick => @waitForConnection(callback)
		else
			callback()

	publishDomainEvent: (eventName) ->
		@domainEvents.subscribe eventName, (data) =>
			#if eventName == "characterMoved"
			#	@server.sockets.volatile.emit eventName, data
			#else
			@server.sockets.emit eventName, data

	publishDomainEvents: ->
		for eventName in allEvents
			@publishDomainEvent eventName

module.exports = EventServer