logger = require '../logger'

class CommandProcessor
	constructor: ->
		@handlerFactories = {}

	handle: (command) ->
		factory = @handlerFactories[command.name];
		if factory?
			handler = factory.createHandler()
			handler.handle command
		else
			throw "There is no registered handler for '#{command.name}' commands."

module.exports = CommandProcessor