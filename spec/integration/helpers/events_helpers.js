var EventSource, Mommo, ReceivedEvents, active, assert, client, commandServer, eventServer, io, ioClient, ioServer, log, wait;

log = require('../../../lib/logger');

Mommo = require("../../../lib");

io = require("socket.io");

ioClient = require("socket.io-client");

commandServer = require('./command_helpers');

assert = require('assert');

ioServer = io.listen(commandServer.server);

ioServer.configure(function() {
  return ioServer.disable('log');
});

ioServer.configure('test', function() {
  ioServer.set('transports', ['xhr-polling']);
  return ioServer.disable('log');
});

eventServer = new Mommo.App.EventServer(ioServer, commandServer.domainEvents);

eventServer.publishDomainEvents();

EventSource = (function() {

  function EventSource() {}

  EventSource.prototype.connect = function(baseUri) {
    var uri;
    uri = baseUri;
    return this.socket = ioClient.connect(uri);
  };

  EventSource.prototype.subscribe = function(eventName, handler) {
    return this.socket.on(eventName, handler);
  };

  return EventSource;

})();

client = new EventSource();

active = false;

eventServer.ready = function(callback) {
  if (active) {
    process.nextTick(callback);
  } else {
    active = true;
    client.connect("http://localhost:" + commandServer.port);
    eventServer.waitForConnection(callback);
  }
};

wait = function(callback) {
  if (!active) {
    process.nextTick(wait);
  } else {
    process.nextTick(callback);
  }
};

ReceivedEvents = (function() {

  function ReceivedEvents() {
    this.events = [];
  }

  ReceivedEvents.prototype.clear = function(name) {
    return this.events[name] = [];
  };

  ReceivedEvents.prototype.add = function(name, data) {
    if (this.events[name] != null) return this.events[name].push(data);
  };

  ReceivedEvents.prototype.getLast = function(name) {
    if (!this.events[name]) {
      throw new Error("" + name + " events are not being recorded.");
    }
    if (this.events[name].length < 1) {
      throw new Error("No " + name + " events have been received.");
    }
    return this.events[name][this.events[name].length - 1];
  };

  ReceivedEvents.prototype.getLastOrNull = function(name) {
    if (!this.events[name]) return null;
    if (this.events[name].length < 1) return null;
    return this.events[name][this.events[name].length - 1];
  };

  ReceivedEvents.prototype.any = function(name) {
    return this.events[name] && this.events[name].length > 0;
  };

  return ReceivedEvents;

})();

module.exports = {
  Named_AreSubscribedTo: function(eventName) {
    return [
      "" + eventName + " events are subscribed to", function() {
        var _this = this;
        if (!(this.receivedEvents != null)) {
          this.receivedEvents = new ReceivedEvents();
        }
        this.receivedEvents.clear(eventName);
        return eventServer.ready(function() {
          module.exports.subscribe(eventName, function(data) {
            return _this.receivedEvents.add(eventName, data);
          });
          return _this.callback();
        });
      }
    ];
  },
  ShouldDescribeTheCreationOfCharacter_Named_: function(id, name) {
    return [
      "I should receive a character created event for character " + id + " named '" + name + "'", function() {
        var event;
        event = this.receivedEvents.getLast('characterCreated');
        assert.equal(event.id, id);
        return assert.equal(event.name, name);
      }
    ];
  },
  ShouldDescribeTheDeletionOfCharacter_: function(id) {
    return [
      "I should receive a character deleted event for character " + id, function() {
        var event;
        event = this.receivedEvents.getLast('characterDeleted');
        return assert.equal(event.id, id);
      }
    ];
  },
  ShouldDescribeCharacter_MovingTo_: function(id, location) {
    return [
      "I should receive an event saying character " + id + " has moved to " + (JSON.stringify(location)), function() {
        var event;
        event = this.receivedEvents.getLast('characterMoved');
        assert.equal(event.id, id);
        return assert.deepEqual(event.location, location);
      }
    ];
  },
  ShouldDescribeCharacter_MovingTowards_: function(id, destination) {
    return [
      "I should receive an event saying character " + id + " is moving towards " + (JSON.stringify(destination)), function() {
        var event;
        event = this.receivedEvents.getLast('characterMoving');
        assert.equal(event.id, id);
        return assert.deepEqual(event.movement.destination, destination);
      }
    ];
  },
  ShouldDescribeCharacter_Moved: function(id) {
    return [
      "I should receive an event saying character " + id + " has moved", function() {
        var event;
        event = this.receivedEvents.getLast('characterMoved');
        return assert.equal(event.id, id);
      }
    ];
  },
  WaitFor_: function(name) {
    return [
      "I wait for a " + name + " event", function() {
        var _this = this;
        return module.exports.waitFor((function() {
          return _this.receivedEvents.any(name);
        }), 10, function(e, r) {
          return _this.callback(e, r);
        });
      }
    ];
  },
  WaitForCharacterToReach_: function(location) {
    return [
      "I wait for the character to reach " + location, function() {
        var _this = this;
        return module.exports.waitFor((function() {
          var event;
          event = _this.receivedEvents.getLastOrNull("characterMoved");
          if (event) {
            return module.exports.vectorsEqual(event.location, location);
          } else {
            return false;
          }
        }), 100000, function(e, r) {
          return _this.callback(e, r);
        });
      }
    ];
  },
  vectorsEqual: function(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
  },
  subscribe: function(eventName, handler) {
    return client.subscribe(eventName, handler);
  },
  connectClientToServer: function(callback) {
    return eventServer.ready((function() {
      return wait(callback);
    }));
  },
  waitFor: function(condition, retries, callback) {
    var _this = this;
    if (retries < 0) {
      return process.nextTick(function() {
        return callback("Condition was not met.", condition);
      });
    } else {
      if (condition()) {
        return process.nextTick(callback);
      } else {
        return process.nextTick(function() {
          return _this.waitFor(condition, retries - 1, callback);
        });
      }
    }
  }
};
