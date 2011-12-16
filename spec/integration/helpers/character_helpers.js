var character, commandClient, log;

commandClient = require("./command_helpers");

log = require('../../../lib/logger');

character = {
  _BeginsMovingTo_: function(characterId, location) {
    return [
      "character " + characterId + " begins moving to " + (JSON.stringify(location)), function() {
        var command;
        command = {
          name: "moveCharacter",
          data: {
            id: characterId,
            location: location
          }
        };
        return commandClient.send(command, this.callback);
      }
    ];
  },
  _IsCreatedWithName_: function(id, name) {
    return [
      "character " + id + " is created with name '" + name + "'", function() {
        var command;
        command = {
          name: "addCharacter",
          data: {
            id: id,
            name: name
          }
        };
        return commandClient.send(command, this.callback);
      }
    ];
  },
  _IsDeleted: function(id) {
    return [
      "I delete character " + id, function() {
        var command;
        command = {
          name: "deleteCharacter",
          data: {
            id: id
          }
        };
        return commandClient.send(command, this.callback);
      }
    ];
  }
};

module.exports = character;
