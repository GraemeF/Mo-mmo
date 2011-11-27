log = require '../../../lib/logger'
Mommo = require "../../../lib"
ioServer = require "socket.io"
ioClient = require "socket.io-client"
commandServer = require './command_helpers'

eventServer = new Mommo.App.EventServer ioServer, commandServer.domainEvents

port = 3004

eventServer.ready = (callback) ->
  if @active
    process.nextTick callback
  else
    @active = true
		eventServer.listen port
		log.info "Event server listening on port #{port}"
		process.nextTick callback
  return

process.on "exit", ->
	if @active
		log.info "Shutting down event server"
		eventServer.close()

wait = ->
  if !@active
    process.nextTick wait
  else
    return

eventServer.ready wait

class EventSource
	connect: (@baseUri) ->
		uri = @baseUri + "commands"
		@socket = ioClient.connect uri
	subscribe: (eventName, handler) ->
		log.debug "Subscribing to #{eventName}"
		@socket.on eventName, handler

client = new EventSource("http://god:#{port}/")
client.connect()

module.exports =
	subscribe: (eventName, handler) ->
		client.subscribe eventName, handler
