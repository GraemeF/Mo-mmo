var _ = require("underscore");

var Browser = function (zombie) {
    this.zombie = zombie;
};

Browser.prototype.createCharacter = function (name, callback) {
    this.zombie
        .fill('newCharacterName', name)
        .pressButton('Add Character', callback);
};

Browser.prototype.characters = function () {
    return _.map(this.zombie.queryAll('.character'),
        function (character) {
            return character.textContent;
        });
};

module.exports = Browser;
