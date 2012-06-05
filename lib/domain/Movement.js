var Vector = require("sylvester").Vector;

module.exports.calculateLocation = function (movement, time) {
    var delta = Vector.create(movement.destination).subtract(Vector.create(movement.source));
    var distance = Vector.create(delta).norm();
    var timeIntoMovement = time - movement.startTime;
    var distanceCovered = movement.speed * timeIntoMovement / 1000;
    if (distanceCovered >= distance)
        return movement.destination;

    var deltaCovered = Vector.create(delta).multiply(distanceCovered / distance);
    return Vector.create(movement.source).add(deltaCovered).elements;
};