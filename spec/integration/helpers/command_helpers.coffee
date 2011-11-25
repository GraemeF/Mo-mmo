util = require "util"
express = require "express"
request = require 'request'
log = require "../../../lib/logger"
Mommo = require "../../../lib"

log.debug "Loading #{__filename}"
server = express.createServer()

commandProcessor = new Mommo.App.CommandProcessor()
commandServer = new Mommo.App.CommandServer(server, commandProcessor)

port = 3003

commandServer.ready = (callback) ->
  if @active
    process.nextTick callback
  else
    @active = true
		log.info "Starting command server"
		commandServer.listen port
		log.info "Listening on port #{port}"
		process.nextTick callback
  return

process.on "exit", ->
	if @active
		log.info "Shutting down command server"
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
				log.info "#{body}"
				callback(error, response)

client = new CommandSink("http://god:#{port}/")

module.exports =
	send: (command, callback) ->
		client.send command, callback