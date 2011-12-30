var _ = require('underscore');

var Character = function (idOrEvents, name, Movement, getTime) {
    this.Movement = Movement != null ? Movement : require("./Movement");
    this.getTime = getTime != null ? getTime : Date.now;
    this.uncommittedEvents = [];
    if (Array.isArray(idOrEvents)) {
        this.apply(idOrEvents);
    } else {
        var event = {
            name:"characterCreated",
            data:{
                id:idOrEvents,
                name:name
            }
        };
        this.apply([event]);
        this.append([event]);
    }
};

Character.prototype["delete"] = function () {
    var event = {
        name:"characterDeleted",
        data:{
            id:this.id
        }
    };
    this.apply([event]);
    this.append([event]);
};

Character.prototype.move = function (destination, callback) {
    var event = {
        name:"characterMoving",
        data:{
            id:this.id,
            movement:{
                source:this.location,
                destination:destination,
                startTime:this.getTime(),
                speed:this.movementSpeed
            }
        }
    };
    this.apply([event]);
    this.append([event]);
    this.trackMovement(event.data.movement, callback);
};

Character.prototype.vectorsEqual = function (a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
};

Character.prototype.trackMovement = function (movement, callback) {
    var _this = this;
    var newLocation = this.Movement.calculateLocation(movement, this.getTime());
    if (!this.vectorsEqual(newLocation, this.location)) {
        var event = {
            name:"characterMoved",
            data:{
                id:this.id,
                location:newLocation
            }
        };
        this.apply([event]);
        this.append([event]);
    }
    process.nextTick(callback);
    if (!this.vectorsEqual(newLocation, movement.destination)) {
        return process.nextTick(function () {
            return _this.trackMovement(movement, callback);
        });
    }
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

Character.prototype.apply_characterMoved = function (data) {
    this.location = data.location;
};

module.exports = Character;
