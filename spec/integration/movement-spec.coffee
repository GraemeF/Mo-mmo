{Feature} = require "vows-bdd"
{logger, Character, Events} = require "./helpers"
vows = require 'vows'
assert = require 'assert'

IShouldReceiveAnEventForCharacter_MovedTo_ = (id, location) ->
	[
		"I should an event saying character #{id} has moved to #{location}",
		->
			event = @receivedEvents.characterMoved[0]
			assert.equal event.id, id
	]

Feature("Movement", module)
	.scenario("Begin moving")
	.given "I have a new character", ->
		@receivedEvents = []
		Character.create 1, "bob", @callback
	.and(Events.IAmSubscribedTo "characterMoved")
	.when "I move to 10, 0, 0", ->
		Character.move 1, {x: 10}, @callback
	.then(IShouldReceiveAnEventForCharacter_MovedTo_ 1, {x:10,y:0,z:0})
	.complete()

#	.scenario("Move away from a tree")
#	.given "my character is ready", ->
#		Character.query.ready @callback
#	.and "there is a tree at 0, 0, 0", ->
#		Environment.command.add "tree", {x:0, y:0, z:0}, @callback
#	.when "I move to 10, 0, 0", ->
#		Character.command.move {x: 10}, @callback
#	.and "I wait until my character reaches its destination", ->
#		Character.query.reachDestination @callback
#	.and "I look around", ->
#		Character.query.environment @callback
#	.then "my character should see a tree at -10, 0, 0", (environment) ->
#		Test.assert.isTrue(environment.contains "tree", {x:-10, y:0, z:0})
#	.complete()

	.finish module