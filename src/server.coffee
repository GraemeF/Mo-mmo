util = require "util"
express = require "express"
request = require 'request'
io = require 'socket.io'
log = require "./logger"
Mommo = require "./index"

server = express.createServer()

eventStore = new Mommo.Domain.InMemoryEventStore()
domainEvents = new Mommo.Domain.DomainEvents()
characterRepo = new Mommo.App.CharacterRepository eventStore, domainEvents
commandProcessor = new Mommo.App.CommandProcessor()

commandProcessor.handlerFactories.addCharacter =
	createHandler: -> new Mommo.App.AddCharacterHandler characterRepo
commandProcessor.handlerFactories.deleteCharacter =
	createHandler: -> new Mommo.App.DeleteCharacterHandler characterRepo
commandProcessor.handlerFactories.moveCharacter =
	createHandler: -> new Mommo.App.MoveCharacterHandler characterRepo

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

ioServer = io.listen server

ioServer.configure () ->
	#ioServer.disable('log')

ioServer.configure 'test', () ->
	ioServer.set('transports', ['xhr-polling'])
	ioServer.disable('log')

eventServer = new Mommo.App.EventServer ioServer, domainEvents

eventServer.publishDomainEvents()

commandServer.ready wait