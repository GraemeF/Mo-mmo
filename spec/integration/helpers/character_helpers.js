var commandClient = require("./command_helpers");

module.exports = {
    _BeginsMovingTo_: function (characterId, location) {
        return [
            "character " + characterId + " begins moving to " + (JSON.stringify(location)),
            function () {
                commandClient.send({
                                       name: "moveCharacter",
                                       data: {
                                           id: characterId,
                                           location: location
                                       }
                                   },
                                   this.callback);
            }
        ];
    },
    _IsCreatedWithName_: function (id, name) {
        return [
            "character " + id + " is created with name '" + name + "'",
            function () {
                commandClient.send({
                                       name: "addCharacter",
                                       data: {
                                           id: id,
                                           name: name
                                       }
                                   },
                                   this.callback);
            }
        ];
    },
    _IsDeleted: function (id) {
        return [
            "I delete character " + id,
            function () {
                commandClient.send({
                                       name: "deleteCharacter",
                                       data: {
                                           id: id
                                       }
                                   },
                                   this.callback);
            }
        ];
    }
};