log = require "../logger"
Math = require "math"

class Character

	constructor: (idOrEvents, name, @Movement = require("./Movement"), @now = Date.now) ->
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

	move: (destination) ->
		event =
			name: "characterMoving"
			data:
				id: @id
				movement:
					source: @location
					destination: destination
					startTime: @now()
		@apply [event]
		@append [event]
		@trackMovement event.data.movement

	trackMovement: (movement) ->
		event =
			name: "characterMoved"
			data:
				id: @id
				location: @Movement.calculateLocation movement, @now()
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
		@location = [0, 0, 0]

	apply_characterDeleted: (data) ->
		@deleted = true

	apply_characterMoving: (data) ->
		@destination = data.destination

	apply_characterMoved: (data) ->
		@location = data.location

module.exports = Character