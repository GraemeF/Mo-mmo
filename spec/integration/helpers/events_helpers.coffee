log = require '../../../lib/logger'
Mommo = require "../../../lib"
io = require "socket.io"
ioClient = require "socket.io-client"
commandServer = require './command_helpers'

ioServer = io.listen commandServer.server

ioServer.configure () ->
	ioServer.disable('log')

ioServer.configure 'test', () ->
	ioServer.set('transports', ['xhr-polling'])
	ioServer.disable('log')

eventServer = new Mommo.App.EventServer ioServer, commandServer.domainEvents

eventServer.publishDomainEvents()

class EventSource
	connect: (baseUri) ->
		uri = baseUri
		@socket = ioClient.connect uri
	subscribe: (eventName, handler) ->
		@socket.on eventName, handler

client = new EventSource()
active = false

eventServer.ready = (callback) ->
	if active
		process.nextTick callback
	else
		active = true
		client.connect "http://localhost:" + commandServer.port
		eventServer.waitForConnection(callback)
	return

process.on "exit", ->
	if active
		eventServer.close()

wait = (callback) ->
	if !active
		process.nextTick wait
	else
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
				process.nextTick callback
			else
				process.nextTick () => @waitFor(condition, retries-1, callback)