express = require "express"
log = require '../logger'

log.debug "Loading #{__filename}"

class CommandServer
	constructor: (@server, @processor) ->

	listen: (port, callback) ->
		@server.use express.logger("dev")
		@server.use express.bodyParser()
		@server.post '/commands', (req, res) ->
			log.debug "Received command #{JSON.stringify req.body}"
			@processor.handle req.body, @callback
		@server.listen port, callback

module.exports = CommandServer