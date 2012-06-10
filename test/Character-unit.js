var Character = require("../lib/domain/Character");

describe('Character', function () {
    var mover;
    var now;

    beforeEach(function () {
        mover = {
            move: sinon.spy()
        };
        now = sinon.stub();
    });

    describe('when created', function () {
        var character;

        beforeEach(function () {
            character = new Character(1, 'bob', mover, now);
        });

        it('should add a characterCreated event to the character\'s uncommitted events',
           function () {
               var event = character.uncommittedEvents[0];
               event.name.should.equal("characterCreated");
               event.data.id.should.equal(1);
               event.data.name.should.equal("bob");
           });

        describe('and moved', function () {
            var startTime = 10000;
            var destination = [1, 2, 3];
            var movement = {
                startTime: startTime,
                source: [0, 0, 0],
                destination: destination,
                speed: 6
            };

            beforeEach(function () {
                now.returns(startTime);
                character.move(destination);
            });

            it('should add a characterMoving event to the character\'s uncommitted events',
               function () {
                   var event = character.uncommittedEvents[1];
                   event.name.should.equal("characterMoving");
                   event.data.id.should.equal(1);
                   event.data.movement.should.eql(movement);
               });

            it('should begin the movement', function () {
                mover.move.should.have.been.calledWith(1);
                mover.move.firstCall.args[1].should.eql(movement);
            });

            describe('and reaches its destination', function () {
                beforeEach(function () {
                    mover.move.firstCall.args[2]();
                });

                it('should add a characterStopped event to the character\'s uncommitted events',
                   function () {
                       var event = character.uncommittedEvents[2];
                       event.name.should.equal("characterStopped");
                       event.data.id.should.equal(1);
                       event.data.location.should.eql(destination);
                   });
            });
        });

        describe('and deleted', function () {
            beforeEach(function () {
                character['delete']();
            });

            it("it should add a characterDeleted event to the character's uncommitted events",
               function () {
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
                name: "characterCreated",
                data: {
                    id: 1,
                    name: "bob"
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