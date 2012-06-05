var Movement = require("../lib/domain/Movement");

describe('Movement', function () {
    var movement;

    beforeEach(function () {
        movement = {
            source:[0, 0, 0],
            destination:[10, 0, 0],
            startTime:0,
            speed:1
        };
    });

    describe('when location is calculated while moving', function () {
        var result;

        beforeEach(function () {
            result = Movement.calculateLocation(movement, 2000);
        });

        it('should return a location between the source and destination', function () {
            result.should.eql([2, 0, 0]);
        });
    });

    describe('after the end of a movement is reached', function () {
        var result;

        beforeEach(function () {
            result = Movement.calculateLocation(movement, 11000);
        });

        it('should return the destination', function () {
            result.should.eql([10, 0, 0]);
        });
    });
});