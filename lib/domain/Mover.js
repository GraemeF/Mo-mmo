var Vector = require("sylvester").Vector;

var Mover = function () {};

var calculateDelta = function (movement) {
    return Vector.create(movement.destination)
        .subtract(Vector.create(movement.source));
};

var calculateDistance = function (movement) {
    var delta = calculateDelta(movement);
    return Vector.create(delta).norm();
};

Mover.prototype.calculateLocation = function (movement, time) {
    var delta = calculateDelta(movement);
    var distance = calculateDistance(movement);
    var timeIntoMovement = time - movement.startTime;
    var distanceCovered = movement.speed * timeIntoMovement / 1000;
    if (distanceCovered >= distance) {
        return movement.destination;
    }

    var deltaCovered = Vector.create(delta).multiply(distanceCovered / distance);
    return Vector.create(movement.source).add(deltaCovered).elements;
};

var calculateDuration = function (movement) {
    return calculateDistance(movement) / movement.speed;
};

Mover.prototype.move = function (id, movement, callback) {
    setTimeout(callback, calculateDuration(movement));
};

module.exports = Mover;