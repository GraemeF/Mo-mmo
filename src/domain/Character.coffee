log = require "../logger"

class Character

	constructor: (idOrEvents, name) ->
		@uncommittedEvents = []
		if Array.isArray idOrEvents
			@apply idOrEvents
		else
			event =
				name: "characterCreated"
				data:
					id: idOrEvents
					name: name
			@apply [event]
			@append [event]

	delete: ->
		event =
			name: "characterDeleted"
			data:
				id: @id
		@apply [event]
		@append [event]

	move: (location) ->
		event =
			name: "characterMoved"
			data:
				id: @id
				location: location
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

	apply_characterDeleted: (data) ->
		@deleted = true

	apply_characterMoved: (data) ->
		@location = data.location

module.exports = Character