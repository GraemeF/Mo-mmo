var _ = require("underscore");
var soon = require('patience').soon;

var Browser = function (zombie) {
    console.log('created browser');
    this.zombie = zombie;
};

Browser.prototype.createCharacter = function (name, callback) {
    var self = this;

    soon(function () {
        return self.zombie.window.viewModel.connected();
    }, this, function () {
        self.zombie
            .fill('newCharacterName', name)
            .pressButton('Add Character', callback);
    });
};

Browser.prototype.characters = function () {
    return _.map(this.zombie.queryAll('.character'),
                 function (character) {
                     return character.textContent;
                 });
};

module.exports = Browser;
