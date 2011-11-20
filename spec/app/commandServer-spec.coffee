{Feature} = require "vows-bdd"
vows = require 'vows'
commandServer = require '#{__dirname}/../../lib/app/commandServer'

Feature("commandServer", module)
	.scenario("Begin moving")
	.given "I have a new character", ->
		Character.create "bob", @callback
	.when "I move to 10, 0, 0", ->
		Character.move "bob", {x: 10}, @callback
	.then "my character should begin moving", ->
		Events.characterShouldBeginMoving "bob", @callback
	.complete()
	.finish(module)