var Math, log;

log = require("../logger");

Math = require("math");

module.exports.calculateLocation = function(movement, time) {
  var delta, deltaCovered, distance, distanceCovered, result, timeIntoMovement;
  delta = [];
  delta = Math.Vector3.subtract(movement.destination, movement.source, delta);
  distance = Math.Vector3.length(delta);
  timeIntoMovement = time - movement.startTime;
  distanceCovered = movement.speed * timeIntoMovement / 1000;
  if (distanceCovered >= distance) return movement.destination;
  deltaCovered = [];
  deltaCovered = Math.Vector3.scale(delta, distanceCovered / distance, deltaCovered);
  result = [];
  return Math.Vector3.add(movement.source, deltaCovered, result);
};
