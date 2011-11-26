util = require "util"
express = require "express"
log = require '../logger'

log.debug "Loading #{__filename}"

class CommandServer
	constructor: (@server, @processor) ->

	listen: (port, callback) ->
		@server.use express.logger("dev")
		@server.use express.bodyParser()
		theProcessor = @processor
		@server.post '/commands', (req, res) ->
			if req.connection? then req.connection.setTimeout 1000
			log.debug "Received command #{JSON.stringify req.body}"
			theProcessor.handle req.body
			res.end()
		@server.listen port, callback

module.exports = CommandServer