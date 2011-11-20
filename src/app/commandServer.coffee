express = require "express"
logger = require '../logger'

class CommandServer
	constructor: (@server, @processor) ->

	listen: (port, callback) ->
		@server.use express.logger("dev")
		@server.use express.bodyParser()
		@server.post '/commands', (req, res) ->
			logger.debug "Received #{JSON.stringify req.body}"
			@processor.handle req.body, @callback
		@server.listen port, callback

module.exports = CommandServer