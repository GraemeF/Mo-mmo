var _ = require("underscore");

var InMemoryEventStore = (function () {

    function InMemoryEventStore() {
        this.events = [];
    }

    InMemoryEventStore.prototype.append = function (newEvents) {
        _.each(newEvents, function (event) {
            this.events.push(event);
        }, this);
    };

    return InMemoryEventStore;

})();

module.exports = InMemoryEventStore;
