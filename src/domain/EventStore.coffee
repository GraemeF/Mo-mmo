class EventStore
	append: (id, event) ->

theEventStore = new EventStore()

module.exports = theEventStore