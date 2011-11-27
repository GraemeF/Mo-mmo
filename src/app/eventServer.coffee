util = require "util"
log = require '../logger'

allEvents = ['characterCreated']

class EventServer
	constructor: (@server, @domainEvents) ->
		@hasConnection = false
		@server.sockets.on "connection", (socket) =>
			log.info "Server received a connection"
			#socket.emit "connect", "foo"
			@hasConnection = true
			#@server.sockets.emit('this', { will: 'be received by everyone'})
			log.info "Connected clients:", @server.sockets.clients().length

	waitForConnection: (callback) ->
		if !@hasConnection
			process.nextTick ()=>@waitForConnection(callback)
		else
			log.debug "Connected clients when connected:", util.inspect @server.sockets.clients()
			log.info "Connected clients:", @server.sockets.clients().length
			callback()

	publishDomainEvents: ->
		theServer = @server
		for eventName in allEvents
			@domainEvents.subscribe eventName, (data) =>
				log.debug "Connected clients:", util.inspect theServer.sockets.clients()
				#log.info "Connected clients:", theServer.sockets.clients().length
				log.debug "EventServer emitting #{eventName}", data
				theServer.sockets.emit eventName, data

module.exports = EventServer