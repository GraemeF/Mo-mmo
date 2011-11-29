{Feature} = require "vows-bdd"
{logger, Character, Events, Wait} = require "./helpers"
vows = require 'vows'
assert = require 'assert'

Feature("Movement", module)
	.scenario("Begin moving")
	.given(Character._IsCreatedWithName_ 1, "bob")
	.and(Events.Named_AreSubscribedTo "characterMoving")
	.and(Events.Named_AreSubscribedTo "characterMoved")
	.when(Character._BeginsMovingTo_ 1, [10, 0, 0])
	.then(Events.ShouldDescribeCharacter_MovingTowards_ 1, [10, 0, 0])
	.and(Events.ShouldDescribeCharacter_Moved 1)
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