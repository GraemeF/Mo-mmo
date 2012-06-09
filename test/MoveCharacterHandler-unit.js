var MoveCharacterHandler = require("../lib/app/MoveCharacterHandler");

describe("MoveCharacterHandler", function () {

    describe('given the repository contains a character', function () {
        var character;
        var repo;

        beforeEach(function () {
            character = {
                location: [0, 0, 0],
                move: sinon.spy()
            };
            repo = {
                getCharacter: sinon.stub().withArgs(1).returns(character),
                storeCharacter: sinon.spy()
            };
        });

        describe('when a command to move character 1 is handled', function () {
            var targetLocation = [10, 0, 0];

            beforeEach(function () {
                var command = {
                    name: "moveCharacter",
                    data: {
                        id: 1,
                        location: targetLocation
                    }
                };
                new MoveCharacterHandler(repo).handle(command);
            });

            it('should move the character', function () {
                character.move.should.have.been.calledWith(targetLocation);
            });
        });
    });
});
