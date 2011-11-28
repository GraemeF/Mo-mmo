util = require "util"
express = require "express"
request = require 'request'
log = require "../../../lib/logger"
Mommo = require "../../../lib"

server = express.createServer()

eventStore = new Mommo.Domain.InMemoryEventStore()
domainEvents = new Mommo.Domain.DomainEvents()
characterRepo = new Mommo.App.CharacterRepository eventStore, domainEvents
commandProcessor = new Mommo.App.CommandProcessor()

commandProcessor.handlerFactories.addCharacter =
	createHandler: -> new Mommo.App.AddCharacterHandler characterRepo
commandProcessor.handlerFactories.deleteCharacter =
	createHandler: -> new Mommo.App.DeleteCharacterHandler characterRepo

commandServer = new Mommo.App.CommandServer server, commandProcessor

port = 3003

commandServer.ready = (callback) ->
  if @active
    process.nextTick callback
  else
    @active = true
		commandServer.listen port
		process.nextTick callback
  return

process.on "exit", ->
	if @active
		commandServer.close()

wait = ->
  if !@active
    process.nextTick wait
  else
    return

commandServer.ready wait

class CommandSink
	constructor: (@baseUri) ->
	send: (command, callback) ->
		uri = @baseUri + "commands"
		request.post
			uri: uri
			json: command,
			(error, response, body) ->
				if !(error?)
					if response.statusCode != 201
						error = body

				if error? then log.error "There was a problem sending a command.", error

				process.nextTick () -> callback(error, response)

client = new CommandSink("http://localhost:#{port}/")

module.exports =
	send: (command, callback) ->
		client.send command, callback
	domainEvents: domainEvents
	server: server
	port: port