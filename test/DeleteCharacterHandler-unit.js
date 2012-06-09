var DeleteCharacterHandler = require("../lib/app/deleteCharacterHandler");

describe('DeleteCharacterHandler', function () {
    describe('when the character repository contains character 1', function () {
        var character;
        var repo;

        beforeEach(function () {
            character = {"delete": sinon.spy()};
            repo = {
                getCharacter: sinon.stub().withArgs(1).returns(character),
                storeCharacter: sinon.spy()
            };
        });

        describe('and a handler handles the deleteCharacter command', function () {

            beforeEach(function () {
                new DeleteCharacterHandler(repo)
                    .handle({
                                name: "deleteCharacter",
                                data: {
                                    id: 1
                                }
                            });
            });

            it('should delete the character', function () {
                character["delete"].should.have.been.called;
            });
            it('should store the character in the repository', function () {
                repo.storeCharacter.should.have.been.calledWith(character);
            });
        });
    });
});
