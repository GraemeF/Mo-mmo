var Mover = require("../lib/domain/Mover");

describe('Mover', function () {
    var movement;
    var mover;

    beforeEach(function () {
        mover = new Mover();
        movement = {
            source: [0, 0, 0],
            destination: [10, 0, 0],
            startTime: 0,
            speed: 100
        };
    });

    describe('when a movement begins', function () {
        var movementComplete;

        beforeEach(function () {
            movementComplete = sinon.spy();
            mover.move(1, movement, movementComplete);
        });

        it('should not call the callback', function () {
            movementComplete.should.not.have.been.called;
        });

        describe('and completes', function () {
            it('should call the callback', function (done) {
                soon(function () {
                    movementComplete.should.have.been.called;
                }, this, done);
            });
        });
    });

    describe('when location is calculated while moving', function () {
        var result;

        beforeEach(function () {
            result = mover.calculateLocation(movement, 20);
        });

        it('should return a location between the source and destination', function () {
            result.should.eql([2, 0, 0]);
        });
    });

    describe('after the end of a movement is reached', function () {
        var result;

        beforeEach(function () {
            result = mover.calculateLocation(movement, 11000);
        });

        it('should return the destination', function () {
            result.should.eql([10, 0, 0]);
        });
    });
});