log = require '../../../lib/logger'
Mommo = require "../../../lib"
io = require "socket.io"
ioClient = require "../../../node_modules/socket.io/node_modules/socket.io-client"
commandServer = require './command_helpers'

ioServer = io.listen 3005

ioServer.configure () ->
	ioServer.disable('log')

ioServer.configure 'test', () ->
	ioServer.set('transports', ['xhr-polling'])
	ioServer.enable('log')

eventServer = new Mommo.App.EventServer ioServer, commandServer.domainEvents

eventServer.publishDomainEvents()

class EventSource
	connect: (baseUri) ->
		uri = baseUri + ""
		log.info "Client connecting to #{uri}"
		@socket = ioClient.connect uri, (socket) ->
			log.info "Client connected to server"
	subscribe: (eventName, handler) ->
		log.debug "socket.io client subscribing to #{eventName}"
		@socket.on eventName, handler
		log.debug "socket.io client subscribed to #{eventName}"

client = new EventSource()
active = false

eventServer.ready = (callback) ->
	log.debug "ready"
	if active
		log.debug "ready - active"
		process.nextTick callback
	else
		log.debug "ready - not active"
		active = true
		client.connect("http://god:3005/")
		eventServer.waitForConnection(callback)
	return

process.on "exit", ->
	if active
		log.info "Shutting down event server"
		eventServer.close()

wait = (callback) ->
	log.debug "wait"
	if !active
		log.debug "wait - not active"
		process.nextTick wait
	else
		log.debug "wait - active"
		process.nextTick(callback)
	return

module.exports =
	subscribe: (eventName, handler) ->
		client.subscribe eventName, handler
	connectClientToServer: (callback) ->
		eventServer.ready (() -> wait callback)
	waitFor: (condition, retries, callback) ->
		if retries < 0
			process.nextTick callback("Condition was not met.", condition)
		else
			if condition()
				log.debug "PASS"
				process.nextTick callback
			else
				log.debug "RETRY #{retries}"
				process.nextTick () => @waitFor(condition, retries-1, callback)