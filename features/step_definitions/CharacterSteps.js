require('chai').should();
var soon = require('patience').soon;
var util = require('util');

module.exports = function () {
    this.Given('character $id exists', function (id, callback) {
        this.sendCommand({
                             name: "addCharacter",
                             data: {
                                 id: id,
                                 name: 'Character with id ' + id
                             }
                         },
                         callback);
    });

    this.When(/^I move character (\d+) towards \[(\d+), (\d+), (\d+)\]$/,
              function (id, x, y, z, callback) {
                  this.sendCommand({
                                       name: "moveCharacter",
                                       data: {
                                           id: id,
                                           location: [x, y, z]
                                       }
                                   },
                                   callback);
              });

    this.When(/^I wait for character (\d+) to reach \[(\d+), (\d+), (\d+)\]$/,
              function (id, x, y, z, callback) {
                  this.socket.on('characterMoved', function (data) {
                      var received = util.inspect(data, false, null);
                      var expected = util.inspect({id: id, location: [ x, y, z]}, false, null);
                      if (received === expected) {
                          callback();
                      }
                  });
                  this.socket.on('characterMoving', function (data) {
                      var received = util.inspect(data, false, null);
                      console.log('characterMoving:', received);
                  });
              });

    this.Then(/^I should receive events describing the movement of character (\d+) towards \[(\d+), (\d+), (\d+)\]$/, function (arg1, arg2, arg3, arg4, callback) {
        // express the regexp above with the code you wish you had
        callback.pending();
    });

    this.Then(/^I should receive a characterMoved event for character (\d+)$/, function (arg1, callback) {
        // express the regexp above with the code you wish you had
        callback.pending();
    });

};