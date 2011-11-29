Character = require "../../../lib/domain/Character"
log = require "../../../lib/logger"
{Feature} = require "vows-bdd"
vows = require 'vows'
assert = require 'assert'
sinon = require 'sinon'
util = require 'util'

EnsureStubsExist = (owner) ->
	owner.movement or= {calculateLocation: sinon.stub()}
	owner.now or= sinon.stub()

Character_IsCreatedWithName_ = (id, name) ->
	[
		"Character #{id} is created with name #{name}",
		->
			EnsureStubsExist this
			@character = new Character 1, "bob", @movement, @now
			@callback()
	]

TheTimeIs_ = (time) ->
	[
		"the time is #{time}",
		->
			EnsureStubsExist this
			@now.returns time
			@callback()
	]

LocationAt_IsCalculatedAs_ = (time, location) ->
	[
		"the location at #{time} is calculated as #{location}",
		->
			EnsureStubsExist this
			@movement.calculateLocation.returns location
			@callback()
	]

IMoveTheCharacterTowards_ = (destination) ->
	[
		"I move the character towards #{destination}",
		->
			@trackMovementCallback = sinon.spy()
			@character.move destination, @trackMovementCallback
			@callback()
	]

Feature("Character", module)
	.scenario("Create a new character")
	.when(Character_IsCreatedWithName_ 1, "bob")
	.then "it should add a characterCreated event to the character's uncommitted events", ->
		event = @character.uncommittedEvents[0]
		assert.equal event.name, "characterCreated"
		assert.equal event.data.id, 1
		assert.equal event.data.name, "bob"
	.complete()

	.scenario("Move a character")
	.given(TheTimeIs_ 10000)
	.and(Character_IsCreatedWithName_ 1, "bob")
	.and(LocationAt_IsCalculatedAs_ 11000, [4, 5, 6])
	.when(IMoveTheCharacterTowards_ [1, 2, 3])
	.and(TheTimeIs_ 11000)
	.then "it should add a characterMoving event to the character's uncommitted events", ->
		event = @character.uncommittedEvents[1]
		assert.equal event.name, "characterMoving"
		assert.equal event.data.id, 1
		assert.equal event.data.movement.startTime, 10000
		assert.deepEqual event.data.movement.source, [0, 0, 0]
		assert.deepEqual event.data.movement.destination, [1, 2, 3]
	.and "it should add a characterMoved event to the character's uncommitted events", ->
		event = @character.uncommittedEvents[2]
		assert.equal event.name, "characterMoved"
		assert.equal event.data.id, 1
		assert.deepEqual event.data.location, [4, 5, 6]
	.and "it should call the callback when movement is tracked", ->
		assert.isTrue @trackMovementCallback.called
	.complete()

	.scenario("Delete a character")
	.given(Character_IsCreatedWithName_ 1, "bob")
	.when "I delete the character", ->
		@character.delete()
		@callback()
	.then "it should add a characterDeleted event to the character's uncommitted events", ->
		event = @character.uncommittedEvents[1]
		assert.equal event.name, "characterDeleted"
		assert.equal event.data.id, 1
	.complete()

	.scenario("Load a character from events")
	.given "a characterCreated event", ->
		@events =
				[
					name:"characterCreated"
					data:
						id: 1
						name: "bob"
				]
		@callback()
	.when "I create a character with the event", ->
		@character = new Character @events
		@callback()
	.then "the character should have the name and id from the event", ->
		assert.equal @character.name, "bob"
		assert.equal @character.id, 1
	.complete()
	.finish(module)