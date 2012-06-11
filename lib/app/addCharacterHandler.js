var AddCharacterHandler, Character, log;

log = require('../logger');

Character = require('../domain/Character');

AddCharacterHandler = (function () {

    function AddCharacterHandler(characterRepo, mover) {
        this.characterRepo = characterRepo;
        this.mover = mover;
    }

    AddCharacterHandler.prototype.handle = function (command) {
        var character;
        character = new Character(this.mover, command.data.id, command.data.name);
        return this.characterRepo.storeCharacter(character);
    };

    return AddCharacterHandler;

})();

module.exports = AddCharacterHandler;
