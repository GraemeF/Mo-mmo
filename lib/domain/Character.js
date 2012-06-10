var _ = require('underscore');

var Character = function (idOrEvents, name, mover, getTime) {
    this.mover = mover != null ? mover : require("./Mover");
    this.getTime = getTime != null ? getTime : Date.now;
    this.uncommittedEvents = [];
    if (Array.isArray(idOrEvents)) {
        this.apply(idOrEvents);
    } else {
        var event = {
            name: "characterCreated",
            data: {
                id: idOrEvents,
                name: name
            }
        };
        this.apply([event]);
        this.append([event]);
    }
};

Character.prototype["delete"] = function () {
    var event = {
        name: "characterDeleted",
        data: {
            id: this.id
        }
    };
    this.apply([event]);
    this.append([event]);
};

Character.prototype.move = function (destination) {
    var movement = {
        source: this.location,
        destination: destination,
        startTime: this.getTime(),
        speed: this.movementSpeed
    };
    var event = {
        name: "characterMoving",
        data: {
            id: this.id,
            movement: movement
        }
    };
    this.apply([event]);
    this.append([event]);

    var self = this;
    this.mover.move(this.id,
                    movement,
                    function () {
                        self.completeMove(movement);
                    });
};

Character.prototype.vectorsEqual = function (a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
};

Character.prototype.completeMove = function (movement) {

    var newLocation = movement.destination;
    var event = {
        name: "characterStopped",
        data: {
            id: this.id,
            location: newLocation
        }
    };
    this.apply([event]);
    this.append([event]);
};

Character.prototype.append = function (events) {
    _.each(events, function (event) {
        this.uncommittedEvents.push(event);
    }, this);
};

Character.prototype.apply = function (events) {
    _.each(events, function (event) {
        this["apply_" + event.name](event.data);
    }, this);
};

Character.prototype.apply_characterCreated = function (data) {
    this.name = data.name;
    this.id = data.id;
    this.movementSpeed = 6;
    this.location = [0, 0, 0];
};

Character.prototype.apply_characterDeleted = function (data) {
    this.deleted = true;
};

Character.prototype.apply_characterMoving = function (data) {
    this.destination = data.movement.destination;
};

Character.prototype.apply_characterStopped = function (data) {
    this.location = data.location;
};

module.exports = Character;
