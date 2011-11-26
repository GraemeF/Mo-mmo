log = require "../logger"
log.debug "Loading #{__filename}"

module.exports =
	Character: require "./Character"
	InMemoryEventStore: require "./InMemoryEventStore"
	DomainEvents: require "./DomainEvents"
