var Character, MoveCharacterHandler, log;

log = require('../logger');

Character = require('../domain/Character');

MoveCharacterHandler = (function() {

  function MoveCharacterHandler(characterRepo) {
    this.characterRepo = characterRepo;
  }

  MoveCharacterHandler.prototype.handle = function(command) {
    var character;
    var _this = this;
    character = this.characterRepo.getCharacter(command.data.id);
    return character.move(command.data.location, function() {
      return _this.characterRepo.storeCharacter(character);
    });
  };

  return MoveCharacterHandler;

})();

module.exports = MoveCharacterHandler;
