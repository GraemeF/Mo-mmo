var Character, Character_IsCreatedWithName_, EnsureStubsExist, Feature, IMoveTheCharacterTowards_, LocationAt_IsCalculatedAs_, TheTimeIs_, assert, log, sinon, util, vows;

Character = require("../../lib/domain/Character");

Feature = require("vows-bdd").Feature;

assert = require('assert');

sinon = require('sinon');

util = require('util');

var mocha = require('mocha');
require('chai').should();

EnsureStubsExist = function (owner) {
    owner.movement || (owner.movement = {
        calculateLocation:sinon.stub()
    });
    return owner.now || (owner.now = sinon.stub());
};

Character_IsCreatedWithName_ = function (id, name) {
    return [
        "Character " + id + " is created with name " + name,
        function () {
            EnsureStubsExist(this);
            this.character = new Character(1, "bob", this.movement, this.now);
            return this.callback();
        }
    ];
};

TheTimeIs_ = function (time) {
    return [
        "the time is " + time,
        function () {
            EnsureStubsExist(this);
            this.now.returns(time);
            return this.callback();
        }
    ];
};

LocationAt_IsCalculatedAs_ = function (time, location) {
    return [
        "the location at " + time + " is calculated as " + location, function () {
            EnsureStubsExist(this);
            this.movement.calculateLocation.returns(location);
            return this.callback();
        }
    ];
};

IMoveTheCharacterTowards_ = function (destination) {
    return [
        "I move the character towards " + destination, function () {
            this.trackMovementCallback = sinon.spy();
            this.character.move(destination, this.trackMovementCallback);
            return this.callback();
        }
    ];
};


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
    });
});


Feature("Character", module)
    .scenario("Delete a character").given(Character_IsCreatedWithName_(1, "bob")).when("I delete the character",
    function () {
        this.character["delete"]();
        return this.callback();
    }).then("it should add a characterDeleted event to the character's uncommitted events",
    function () {
        var event;
        event = this.character.uncommittedEvents[1];
        assert.equal(event.name, "characterDeleted");
        return assert.equal(event.data.id, 1);
    }).complete().scenario("Load a character from events").given("a characterCreated event",
    function () {
        this.events = [
            {
                name:"characterCreated",
                data:{
                    id:1,
                    name:"bob"
                }
            }
        ];
        return this.callback();
    }).when("I create a character with the event",
    function () {
        this.character = new Character(this.events);
        return this.callback();
    }).then("the character should have the name and id from the event",
    function () {
        assert.equal(this.character.name, "bob");
        return assert.equal(this.character.id, 1);
    }).complete().finish(module);
