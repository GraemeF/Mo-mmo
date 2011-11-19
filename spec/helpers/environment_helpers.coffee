server = require "./server_helpers"

environment = {}

environment.add = (type, location, callback) ->
	process.nextTick callback
	return

module.exports = environment