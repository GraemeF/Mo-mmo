var DeleteCharacterHandler, log;

log = require('../logger');

DeleteCharacterHandler = (function() {

  function DeleteCharacterHandler(characterRepo) {
    this.characterRepo = characterRepo;
  }

  DeleteCharacterHandler.prototype.handle = function(command) {
    var character;
    character = this.characterRepo.getCharacter(command.data.id);
    character["delete"]();
    return this.characterRepo.storeCharacter(character);
  };

  return DeleteCharacterHandler;

})();

module.exports = DeleteCharacterHandler;
