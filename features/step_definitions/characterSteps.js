module.exports = function () {

    this.When('I create a character named $name', function (name, callback) {
        this.browser.createCharacter(name, callback);
    });

    this.Then('a character named $name should be shown', function (name, callback) {
        // express the regexp above with the code you wish you had
        callback.pending();
    });
};