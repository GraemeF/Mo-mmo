server = require "./server_helpers"

environment =
	command:
		add: (type, location, callback) ->
			process.nextTick callback
			return

module.exports = environment