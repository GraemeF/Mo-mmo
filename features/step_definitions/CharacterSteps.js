require('chai').should();
var soon = require('patience').soon;

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

    this.Given(/^I am subscribed to characterMoving events$/, function (callback) {
        // express the regexp above with the code you wish you had
        callback.pending();
    });

    this.Given(/^I am subscribed to characterMoved events$/, function (callback) {
        // express the regexp above with the code you wish you had
        callback.pending();
    });

    this.When(/^character (\d+) begins moving to \[(\d+), (\d+), (\d+)\]$/, function (arg1, arg2, arg3, arg4, callback) {
        // express the regexp above with the code you wish you had
        callback.pending();
    });

    this.When(/^I wait for character (\d+) to reach \[(\d+), (\d+), (\d+)\]$/, function (arg1, arg2, arg3, arg4, callback) {
        // express the regexp above with the code you wish you had
        callback.pending();
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