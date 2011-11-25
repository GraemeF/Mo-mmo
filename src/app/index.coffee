log = require "../logger"
log.debug "Loading #{__filename}"

module.exports =
	CommandServer: require "./commandServer"
	CommandProcessor: require "./commandProcessor"