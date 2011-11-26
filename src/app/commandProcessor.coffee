logger = require '../logger'

class CommandProcessor
	constructor: ->
		@handlerFactories = {}

	handle: (command, callback) ->
		factory = @handlerFactories[command.name];
		if factory?
			handler = factory.createHandler()
			handler.handle command, callback
		else
			callback "There is no registered handler for '#{command.name}' commands."

module.exports = CommandProcessor