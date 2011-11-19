server = require "./server_helpers"

character = {}

character.ready = (callback) ->
	process.nextTick callback
	return

character.move = (offset, callback) ->
	process.nextTick callback
	return

character.getEnvironment = (callback) ->
	server.get "http://localhost:#{server.port}/", callback
	return

character.getStatus = (callback) ->
	server.get "http://localhost:#{server.port}/", callback
	return

module.exports = character