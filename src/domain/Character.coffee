log = require "../logger"

class Character

	constructor: (id, name) ->
		@uncommittedEvents = []
		event =
			name: "characterCreated"
			data:
				id: id
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

module.exports = Character