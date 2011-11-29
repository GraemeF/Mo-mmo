log = require "../logger"
Math = require "math"

module.exports.calculateLocation = (movement, time) ->
		delta = Math.Vector3.subtract movement.destination, movement.source
		distance = Math.Vector3.length delta
		timeIntoMovement = time - movement.startTime
		distanceCovered = movement.speed * timeIntoMovement / 1000
		if distanceCovered >= distance
			return movement.destination

		deltaCovered = Math.Vector3.scale delta, distanceCovered / distance
		Math.Vector3.add movement.source, deltaCovered