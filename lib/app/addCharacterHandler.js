var AddCharacterHandler, Character, log;

log = require('../logger');

Character = require('../domain/Character');

AddCharacterHandler = (function() {

  function AddCharacterHandler(characterRepo) {
    this.characterRepo = characterRepo;
  }

  AddCharacterHandler.prototype.handle = function(command) {
    var character;
    character = new Character(command.data.id, command.data.name);
    return this.characterRepo.storeCharacter(character);
  };

  return AddCharacterHandler;

})();

module.exports = AddCharacterHandler;
