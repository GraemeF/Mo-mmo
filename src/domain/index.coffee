log = require "../logger"
log.debug "Loading #{__filename}"

module.exports =
	logger: log
	Character: require "./Character"
	EventStore: require "./EventStore"
