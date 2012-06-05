var events = require('events');
var _ = require('underscore');

var DomainEvents = function () {
    this.emitter = new events.EventEmitter();
};

DomainEvents.prototype.publish = function (publishedEvents) {
    _.each(publishedEvents, function (event) {
        //console.log("Emitting " + event.name, event.data);
        this.emitter.emit(event.name, event.data);
    }, this);
};

DomainEvents.prototype.subscribe = function (eventName, handler) {
    this.emitter.on(eventName, handler);
};

module.exports = DomainEvents;