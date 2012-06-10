require('chai').should();
var soon = require('patience').soon;

module.exports = function () {

    this.Given(/^(.*) events are subscribed to$/, function (eventName, callback) {
        var self = this;
        if (!(this.receivedEvents != null)) {
            this.receivedEvents = new ReceivedEvents();
        }
        this.receivedEvents.clear(eventName);
        this.eventServer.ready(function () {
            module.exports.subscribe(eventName, function (data) {
                return self.receivedEvents.add(eventName, data);
            });
            callback();
        });
    });

    this.When(/^character (\d+) is created with name 'bob'$/, function (arg1, callback) {
        // express the regexp above with the code you wish you had
        callback.pending();
    });

    this.Then(/^events should describe the creation of character (\d+) named 'bob'$/, function (arg1, callback) {
        // express the regexp above with the code you wish you had
        callback.pending();
    });
};
