log = require '../../../lib/logger'
Mommo = require "../../../lib"
io = require "socket.io"
ioClient = require "socket.io-client"
commandServer = require './command_helpers'
assert = require 'assert'

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

wait = (callback) ->
	if !active
		process.nextTick wait
	else
		process.nextTick(callback)
	return

module.exports =
	Named_AreSubscribedTo: (eventName) ->
		[
			"#{eventName} events are subscribed to",
			->
				if !@receivedEvents? then @receivedEvents = {}
				@receivedEvents[eventName] = []
				eventServer.ready =>
					module.exports.subscribe eventName, (data) =>
						if @receivedEvents[eventName]?
							@receivedEvents[eventName].push data
					@callback()
		]

	ShouldDescribeTheCreationOfCharacter_Named_: (id, name) ->
		[
			"I should receive a character created event for character #{id} named '#{name}'",
			->
				event = @receivedEvents.characterCreated[0]
				assert.equal event.id, id
				assert.equal event.name, name
		]

	ShouldDescribeTheDeletionOfCharacter_: (id) ->
		[
			"I should receive a character deleted event for character #{id}",
			->
				event = @receivedEvents.characterDeleted[0]
				assert.equal event.id, id
		]

	ShouldDescribeCharacter_MovingTo_: (id, location) ->
		[
			"I should an event saying character #{id} has moved to #{JSON.stringify location}",
			->
				event = @receivedEvents.characterMoved[0]
				assert.equal event.id, id
		]

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