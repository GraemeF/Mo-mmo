InMemoryEventStore = require("../lib/domain/InMemoryEventStore");

describe("InMemoryEventStore", function () {
    var store;

    beforeEach(function () {
        store = new InMemoryEventStore();
    });

    describe('when an event is appended', function () {
        const event = {
            name:"foo",
            data:"bar"
        };

        beforeEach(function () {
            store.append([event]);
        });

        it("should contain the event", function () {
            store.events.should.contain(event);
        })
    });
});