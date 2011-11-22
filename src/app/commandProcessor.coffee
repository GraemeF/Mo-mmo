logger = require '../logger'

class CommandProcessor
	handle: (command, callback) ->
		logger.debug "Handling #{command.name}"
		handler = @handlerFactories[command.name].createHandler()
		handler.handle command, callback

	handlerFactories: {}

module.exports = CommandProcessor