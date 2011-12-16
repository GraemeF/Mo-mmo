var InMemoryEventStore, log, util;

util = require("util");

log = require("../logger");

InMemoryEventStore = (function() {

  function InMemoryEventStore() {
    this.events = [];
  }

  InMemoryEventStore.prototype.append = function(newEvents) {
    var event, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = newEvents.length; _i < _len; _i++) {
      event = newEvents[_i];
      _results.push(this.events.push(event));
    }
    return _results;
  };

  return InMemoryEventStore;

})();

module.exports = InMemoryEventStore;
