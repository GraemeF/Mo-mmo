{Feature} = require "vows-bdd"
{Character, Events} = require "./helpers"
vows = require 'vows'

Feature("Movement", module)
	.scenario("Begin moving")
	.given "I have a new character", ->
		Character.create "bob", @callback
	.when "I move to 10, 0, 0", ->
		Character.move "bob", {x: 10}, @callback
	.then "my character should begin moving", ->
		Events.characterShouldBeginMoving "bob", @callback
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