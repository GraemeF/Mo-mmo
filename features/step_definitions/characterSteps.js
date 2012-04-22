require('chai').should();

var soon = function (test, context, callback) {
    var attempts = 0;

    var seeIfTestPasses = function (test, context, callback) {
        try {
            test.call(context);
            callback();
        }
        catch (e) {
            callback(e);
        }
    };

    var retryingCallback = function (error) {
        if (error) {
            if (attempts++ < 100) {
                setTimeout(function () {
                    seeIfTestPasses(test, context, retryingCallback);
                }, 10);
            }
            else {
                callback.fail(error);
            }
        }
        else
            callback();
    };

    process.nextTick(function () {
        seeIfTestPasses(test, context, retryingCallback);
    });
};

module.exports = function () {

    this.When('I create a character named $name', function (name, callback) {
        this.browser.createCharacter(name, callback);
    });

    this.Then('a character named $name should be shown', function (name, callback) {
        soon(function () {
            this.browser.characters().should.include(name);
        }, this, callback);
    });
};