request = require 'request'
logger = require "#{__dirname}/../../../lib/logger"
CommandServer = require "#{__dirname}/../../../lib/app"

server = new CommandServer()

port = 3003

server.ready = (callback) ->
  if @active
    process.nextTick callback
  else
    @active = true
		logger.info "Starting command server"
		server.listen port
		logger.info "Listening on port #{port}"
		process.nextTick callback
  return

process.on "exit", ->
	if @active
		logger.info "Shutting down command server"
		server.close()

wait = ->
  if !@active
    process.nextTick wait
  else
    return

server.ready wait

class CommandSink
	constructor: (@baseUri) ->
	send: (command, callback) ->
		request.post
			uri: @baseUri + "commands"
			json: command,
			callback

client = new CommandSink("http://god:#{port}/")

module.exports =
	send: (command, callback) ->
		logger.debug "Sending #{JSON.stringify command}"
		client.send command, callback