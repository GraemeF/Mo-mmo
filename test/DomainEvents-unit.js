var DomainEvents = require("../lib/domain/DomainEvents");

describe('DomainEvents', function () {
    var domainEvents;

    beforeEach(function () {
        domainEvents = new DomainEvents();
    });

    describe("a subscription to the foo event", function () {
        var listener;

        beforeEach(function () {
            listener = sinon.spy();
            domainEvents.subscribe("foo", listener);
        });

        describe('and a foo event is published', function () {
            const eventData = {hello:'world'};

            beforeEach(function () {
                domainEvents.publish([
                                         {
                                             name:"foo",
                                             data:eventData
                                         }
                                     ]);
            });

            it("should call the listener with the event data", function () {
                listener.should.have.been.calledWith(eventData);
            });
        });
    });
});