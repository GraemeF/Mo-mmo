var Character, Math, log, util;

log = require("../logger");

Math = require("math");

util = require("util");

Character = (function() {

  function Character(idOrEvents, name, Movement, getTime) {
    var event;
    this.Movement = Movement != null ? Movement : require("./Movement");
    this.getTime = getTime != null ? getTime : Date.now;
    this.uncommittedEvents = [];
    if (Array.isArray(idOrEvents)) {
      this.apply(idOrEvents);
    } else {
      event = {
        name: "characterCreated",
        data: {
          id: idOrEvents,
          name: name
        }
      };
      this.apply([event]);
      this.append([event]);
    }
  }

  Character.prototype["delete"] = function() {
    var event;
    event = {
      name: "characterDeleted",
      data: {
        id: this.id
      }
    };
    this.apply([event]);
    return this.append([event]);
  };

  Character.prototype.move = function(destination, callback) {
    var event;
    event = {
      name: "characterMoving",
      data: {
        id: this.id,
        movement: {
          source: this.location,
          destination: destination,
          startTime: this.getTime(),
          speed: this.movementSpeed
        }
      }
    };
    this.apply([event]);
    this.append([event]);
    return this.trackMovement(event.data.movement, callback);
  };

  Character.prototype.vectorsEqual = function(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
  };

  Character.prototype.trackMovement = function(movement, callback) {
    var event, newLocation;
    var _this = this;
    newLocation = this.Movement.calculateLocation(movement, this.getTime());
    if (!this.vectorsEqual(newLocation, this.location)) {
      event = {
        name: "characterMoved",
        data: {
          id: this.id,
          location: newLocation
        }
      };
      this.apply([event]);
      this.append([event]);
    }
    process.nextTick(callback);
    if (!this.vectorsEqual(newLocation, movement.destination)) {
      return process.nextTick(function() {
        return _this.trackMovement(movement, callback);
      });
    }
  };

  Character.prototype.append = function(events) {
    var event, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = events.length; _i < _len; _i++) {
      event = events[_i];
      _results.push(this.uncommittedEvents.push(event));
    }
    return _results;
  };

  Character.prototype.apply = function(events) {
    var event, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = events.length; _i < _len; _i++) {
      event = events[_i];
      _results.push(this["apply_" + event.name](event.data));
    }
    return _results;
  };

  Character.prototype.apply_characterCreated = function(data) {
    this.name = data.name;
    this.id = data.id;
    this.movementSpeed = 6;
    return this.location = [0, 0, 0];
  };

  Character.prototype.apply_characterDeleted = function(data) {
    return this.deleted = true;
  };

  Character.prototype.apply_characterMoving = function(data) {
    return this.destination = data.movement.destination;
  };

  Character.prototype.apply_characterMoved = function(data) {
    return this.location = data.location;
  };

  return Character;

})();

module.exports = Character;
