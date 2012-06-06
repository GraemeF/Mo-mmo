AddCharacterHandler = require('../lib/app/AddCharacterHandler');

describe('AddCharacterHandler', function () {
    describe('when the character repository is empty', function () {
        var repo;
        var handler;

        beforeEach(function () {
            repo = {storeCharacter: sinon.spy()};
            handler = new AddCharacterHandler(repo);
        });

        describe('when an addCharacter command is handled', function () {
            beforeEach(function () {
                handler.handle({
                                   name: 'addCharacter',
                                   data: {
                                       id: 1,
                                       name: 'bob'
                                   }
                               });
            });

            it('should store the new character in the repository', function () {
                repo.storeCharacter.should.have.been.calledOnce;

                var addedCharacter = repo.storeCharacter.firstCall.args[0];
                addedCharacter.name.should.equal('bob');
                addedCharacter.id.should.equal(1);
            });
        });
    });
});
