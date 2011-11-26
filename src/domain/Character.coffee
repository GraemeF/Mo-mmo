log = require "../logger"
log.debug "Loading #{__filename}"

class Character

	constructor: (id, name) ->
		log.info "Constructing new character (#{id}: #{name})"
		@uncommittedEvents = []
		event =
			name: "characterCreated"
			data:
				id: id
				name: name
		@apply [event]
		@append [event]

	append: (events) ->
		for event in events
			@uncommittedEvents.push event

	apply: (events) ->
		for event in events
			@["apply_" + event.name] event.data

	apply_characterCreated: (data) ->
		@name = data.name
		@id = data.id

module.exports = Character