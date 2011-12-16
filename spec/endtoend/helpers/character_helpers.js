var browser, character, log;

log = require('../../../lib/logger');

browser = require('./browser_helpers');

character = {
  IsCreatedWithName_: function(name) {
    return [
      "character is created with name '" + name + "'", function() {
        return browser.createCharacter(name, this.callback);
      }
    ];
  },
  _ShouldBeShown: function(name) {
    return [
      "character '" + name + "' should be shown", function() {
        return browser.characters(this.callback);
      }
    ];
  }
};

module.exports = character;
