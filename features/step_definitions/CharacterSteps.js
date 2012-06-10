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

    this.When(/^character (\d+) should stop at \[(\d+), (\d+), (\d+)\]$/,
              function (id, x, y, z, callback) {
                  this.socket.on('characterStopped', function (data) {
                      var received = util.inspect(data, false, null);
                      console.log(received);
                      var expected = util.inspect({id: id, location: [ x, y, z]}, false, null);
                      if (received === expected) {
                          callback();
                      }
                  });
              });
};