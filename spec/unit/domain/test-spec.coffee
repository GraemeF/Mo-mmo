{Feature} = require "vows-bdd"
vows = require 'vows'
assert = require 'assert'

Feature("Share stuff between steps", module)
	.scenario("Set properties on given and when")

	.given "A is set", ->
		@A = "A"
		@callback()

	.when "I set B", ->
		@B = "B"
		process.nextTick => @callback()

	.then "A should still be set", ->
		assert.equal @A, "A"

	.and "B should still be set", ->
		assert.equal @B, "B"

	.complete()

	.scenario("Do stuff to arrays")

	.given "an array with 1,2,3", ->
		@x = [1,2,3]
		@callback()

	.when "I copy it", ->
		@y = @x.slice(0)
		@callback()

	.and "I change the first array", ->
		@x.push 4
		@callback()

	.then "the copy should not be affected", ->
		assert.deepEqual @y, [1,2,3]


	.complete()
	.finish(module)