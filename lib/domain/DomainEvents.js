var DomainEvents, events, log, util;

util = require('util');

log = require("../logger");

events = require('events');

DomainEvents = (function() {

  function DomainEvents() {
    this.emitter = new events.EventEmitter();
  }

  DomainEvents.prototype.publish = function(publishedEvents) {
    var event, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = publishedEvents.length; _i < _len; _i++) {
      event = publishedEvents[_i];
      console.log("Emitting " + event.name, event.data);
      _results.push(this.emitter.emit(event.name, event.data));
    }
    return _results;
  };

  DomainEvents.prototype.subscribe = function(eventName, handler) {
    return this.emitter.on(eventName, handler);
  };

  return DomainEvents;

})();

module.exports = DomainEvents;
