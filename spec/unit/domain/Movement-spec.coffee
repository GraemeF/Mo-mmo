Movement = require "../../../lib/domain/Movement"
log = require "../../../lib/logger"
{Feature} = require "vows-bdd"
vows = require 'vows'
assert = require 'assert'

AMovementFrom_To_StartingAt_AtASpeedOf_UnitsPerSecond = (source, destination, startTime, speed) ->
	[
		"a movement from #{source} to #{destination} starting at #{startTime}ms at a speed of #{speed} units/second",
		->
			@movement =
				source: source
				destination: destination
				startTime: startTime
				speed: speed
			@callback()
	]

TheMovementShouldStillBeFrom_To_StartingAt_AtASpeedOf_UnitsPerSecond = (source, destination, startTime, speed) ->
	[
		"the movement should still be from #{source} to #{destination} starting at #{startTime}ms at a speed of #{speed} units/second",
		->
			assert.deepEqual @movement,
				source: source
				destination: destination
				startTime: startTime
				speed: speed
	]

TheLocationAt_IsCalculated = (time) ->
	[
		"the location at #{time}ms is calculated",
		->
			@result = Movement.calculateLocation @movement, time
			@callback()
	]

TheResultShouldBeApproximately_ = (expected) ->
	[
		"the result should be approximately #{expected}",
		->
			assert.deepEqual @result, expected
	]

Feature("Movement", module)
	.scenario("Calculate a location along a movement")
	.given(AMovementFrom_To_StartingAt_AtASpeedOf_UnitsPerSecond [0,0,0], [10,0,0], 0, 1)
	.when(TheLocationAt_IsCalculated 2000)
	.then(TheResultShouldBeApproximately_ [2,0,0])
	.and(TheMovementShouldStillBeFrom_To_StartingAt_AtASpeedOf_UnitsPerSecond [0,0,0], [10,0,0], 0, 1)
	.complete()

	.scenario("Reach the end of a movement")
	.given(AMovementFrom_To_StartingAt_AtASpeedOf_UnitsPerSecond [0,0,0], [10,0,0], 0, 1)
	.when(TheLocationAt_IsCalculated 20000)
	.then(TheResultShouldBeApproximately_ [10,0,0])
	.complete()
	.finish(module)
