var CharacterRepository = require("../lib/app/characterRepository");

var FakeCharacter = function (events) {
    this.events = events;
};

describe('CharacterRepository', function () {
    var domainEvents;

    beforeEach(function () {
        domainEvents = {
            publish: sinon.spy()
        };
    });

    describe('when the event store is empty', function () {
        var repo;
        var eventStore;

        beforeEach(function () {
            eventStore = {
                append: sinon.spy(),
                events: []
            };
            repo = new CharacterRepository(eventStore, domainEvents, FakeCharacter);
        });

        describe('store a character with an uncommitted event', function () {
            var events = [
                {name: 'some event'}
            ];
            var character;

            beforeEach(function () {
                character = {
                    id: 1,
                    uncommittedEvents: events
                };
                repo.storeCharacter(character);
            });
            it('should append the uncommitted events to the event store', function () {
                eventStore.append.should.have.been.calledWith(events);
            });
            it('should publish the events', function () {
                domainEvents.publish.should.have.been.calledWith(events);
            });
            it('should clear the uncommitted events from the character', function () {
                character.uncommittedEvents.should.be.empty;
            });
        });
    });

    describe('the event store has an event', function () {
        var repo;
        var eventStore;
        var events = [
            {name: 'some event'}
        ];

        beforeEach(function () {
            eventStore = {
                append: sinon.spy(),
                events: events
            };
            repo = new CharacterRepository(eventStore, domainEvents, FakeCharacter);
        });
        describe('get a character from the repository', function () {
            var character;

            beforeEach(function () {
                character = repo.getCharacter();
            });

            it('should get a character with the events from the event store', function () {
                character.events.should.eql(events);
            });
        });
    });
});