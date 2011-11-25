log = require "../logger"
log.debug "Loading #{__filename}"

class EventStore
	append: (id, event) ->

theEventStore = new EventStore()

module.exports = theEventStore