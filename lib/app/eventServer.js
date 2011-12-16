var EventServer, allEvents, log, util;

util = require("util");

log = require('../logger');

allEvents = ['characterCreated', 'characterDeleted', 'characterMoving', 'characterMoved'];

EventServer = (function() {

  function EventServer(server, domainEvents) {
    var _this = this;
    this.server = server;
    this.domainEvents = domainEvents;
    this.hasConnection = false;
    this.server.sockets.on("connection", function(socket) {
      return _this.hasConnection = true;
    });
  }

  EventServer.prototype.waitForConnection = function(callback) {
    var _this = this;
    if (!this.hasConnection) {
      return process.nextTick(function() {
        return _this.waitForConnection(callback);
      });
    } else {
      return callback();
    }
  };

  EventServer.prototype.publishDomainEvent = function(eventName) {
    var _this = this;
    return this.domainEvents.subscribe(eventName, function(data) {
      return _this.server.sockets.emit(eventName, data);
    });
  };

  EventServer.prototype.publishDomainEvents = function() {
    var eventName, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = allEvents.length; _i < _len; _i++) {
      eventName = allEvents[_i];
      _results.push(this.publishDomainEvent(eventName));
    }
    return _results;
  };

  return EventServer;

})();

module.exports = EventServer;
