log = require "../logger"
log.debug "Loading #{__filename}"

class Character

	constructor: (id, name) ->
		log.info "Constructing new character (#{id}: #{name})"
		event =
			name: "characterCreated"
			data:
				id: id
				name: name
		@apply [event]
		@append [event]

	uncommittedEvents: []

	append: (events) ->
		for event in events
			@uncommittedEvents.push event

	apply: (events) ->
		for event in events
			switch event.name
				when "characterCreated"
					@name = event.data.name
					@id = event.data.id

module.exports = Character