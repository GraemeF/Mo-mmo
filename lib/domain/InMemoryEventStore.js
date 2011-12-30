var _ = require("underscore");

InMemoryEventStore = function () {
    this.events = [];
};

InMemoryEventStore.prototype.append = function (newEvents) {
    _.each(newEvents, function (event) {
        this.events.push(event);
    }, this);
};

module.exports = InMemoryEventStore;
