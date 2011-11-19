{Feature} = require "vows-bdd"
{Server, Test, Character, Environment} = require "./helpers"
vows = require 'vows'

Feature("Movement", module)
	.scenario("Begin moving")
	.given "my character is ready", ->
		Character.ready @callback
	.when "I move to 10, 0, 0", ->
		Character.move {x: 10}, @callback
	.and "I get my status", ->
		Character.getStatus @callback
	.then "my character should be moving somewhere", (err,response) ->
		status = JSON.parse response.body
		Test.assert.isTrue status.movement.x > 0
		Test.assert.isTrue status.movement.x < 10
	.complete()

	.scenario("Move away from a tree")
	.given "my character is ready", ->
		Character.ready @callback
	.and "there is a tree at 0, 0, 0", ->
		Environment.add "tree", {x:0, y:0, z:0}, @callback
	.when "I move to 10, 0, 0", ->
		Character.move {x: 10}, @callback
	.and "I look around", ->
		Character.getEnvironment @callback
	.then "my character should see a tree at -10, 0, 0", (err,response) ->
		Test.assert.equal response.body, "[{type: 'tree', position{x:-10, y:0, z:0}}]"
	.complete()

	.finish module