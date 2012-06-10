var ReceivedEvents = function () {
    this.events = [];
};

ReceivedEvents.prototype.clear = function (name) {
    this.events[name] = [];
};

ReceivedEvents.prototype.add = function (name, data) {
    if (this.events[name] !== null) {
        this.events[name].push(data);
    }
};

ReceivedEvents.prototype.getLast = function (name) {
    if (!this.events[name]) {
        throw new Error(name + " events are not being recorded.");
    }
    if (this.events[name].length < 1) {
        throw new Error("No " + name + " events have been received.");
    }
    return this.events[name][this.events[name].length - 1];
};

ReceivedEvents.prototype.getLastOrNull = function (name) {
    if (!this.events[name]) {
        return null;
    }
    if (this.events[name].length < 1) {
        return null;
    }
    return this.events[name][this.events[name].length - 1];
};

ReceivedEvents.prototype.any = function (name) {
    return this.events[name] && this.events[name].length > 0;
};

module.exports = ReceivedEvents;