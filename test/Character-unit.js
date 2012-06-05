var Character = require("../lib/domain/Character");

describe('Character', function () {
    var movement;
    var now;

    beforeEach(function () {
        movement = {
            calculateLocation:sinon.stub()
        };
        now = sinon.stub();
    });

    describe('when created', function () {
        var character;

        beforeEach(function () {
            character = new Character(1, "bob", movement, now);
        });

        it('should add a characterCreated event to the character\'s uncommitted events', function () {
            var event = character.uncommittedEvents[0];
            event.name.should.equal("characterCreated");
            event.data.id.should.equal(1);
            event.data.name.should.equal("bob");
        });

        describe('and told to move', function () {
            const startTime = 10000;
            const midLocation = [4, 5, 6];
            const destination = [1, 2, 3];
            var trackMovementCallback = sinon.spy();

            beforeEach(function () {
                movement.calculateLocation.returns(midLocation);
                now.returns(startTime);

                character.move(destination, trackMovementCallback);
            });

            it('should add a characterMoving event to the character\'s uncommitted events', function () {
                var event = character.uncommittedEvents[1];
                event.name.should.equal("characterMoving");
                event.data.id.should.equal(1);
                event.data.movement.startTime.should.equal(startTime);
                event.data.movement.source.should.eql([0, 0, 0]);
                event.data.movement.destination.should.eql(destination);
            });

            it('should add a characterMoved event to the character\'s uncommitted events', function () {
                var event = character.uncommittedEvents[2];
                event.name.should.equal("characterMoved");
                event.data.id.should.equal(1);
                event.data.location.should.eql(midLocation);
            });

            it('it should call the callback when movement is tracked', function () {
                trackMovementCallback.called.should.be.true;
            });
        });

        describe('and deleted', function () {
            beforeEach(function () {
                character['delete']();
            });

            it("it should add a characterDeleted event to the character's uncommitted events", function () {
                var event = character.uncommittedEvents[1];
                event.name.should.equal("characterDeleted");
                event.data.id.should.equal(1);
            });
        });
    });

    describe('when loaded from events', function () {
        var character;
        var events = [
            {
                name:"characterCreated",
                data:{
                    id:1,
                    name:"bob"
                }
            }
        ];

        beforeEach(function () {
            character = new Character(events);
        });

        it('should have the id from the event', function () {
            character.id.should.equal(1);
        });
        it('should have the name from the event', function () {
            character.name.should.equal("bob");
        });
    });
});