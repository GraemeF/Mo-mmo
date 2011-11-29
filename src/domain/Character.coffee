log = require "../logger"
Math = require "math"
util = require "util"

class Character

	constructor: (idOrEvents, name, @Movement = require("./Movement"), @getTime = Date.now) ->
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

	move: (destination, callback) ->
		event =
			name: "characterMoving"
			data:
				id: @id
				movement:
					source: @location
					destination: destination
					startTime: @getTime()
					speed: @movementSpeed
		@apply [event]
		@append [event]
		@trackMovement event.data.movement, callback

	trackMovement: (movement, callback) ->
		event =
			name: "characterMoved"
			data:
				id: @id
				location: @Movement.calculateLocation movement, @getTime()
		@apply [event]
		@append [event]
		callback()

	append: (events) ->
		for event in events
			@uncommittedEvents.push event

	apply: (events) ->
		for event in events
			@["apply_" + event.name] event.data

	apply_characterCreated: (data) ->
		@name = data.name
		@id = data.id
		@movementSpeed = 1
		@location = [0, 0, 0]

	apply_characterDeleted: (data) ->
		@deleted = true

	apply_characterMoving: (data) ->
		@destination = data.movement.destination

	apply_characterMoved: (data) ->
		@location = data.location

module.exports = Character