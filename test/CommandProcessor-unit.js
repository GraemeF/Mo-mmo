var CommandProcessor = require("../lib/app/commandProcessor");

describe('CommandProcessor', function () {
    var processor;

    beforeEach(function () {
        processor = new CommandProcessor();
    });

    describe('with a handler factory', function () {
        var handler;

        beforeEach(function () {
            handler = {handle: sinon.spy()};
            processor.handlerFactories.foo = {createHandler: sinon.stub().returns(handler)};
        });

        describe('given a recognised command to handle', function () {
            var fooCommand = {
                name: "foo",
                data: "bar"
            };

            beforeEach(function () {
                processor.handle(fooCommand);
            });

            it('should ask a handler to handle the command', function () {
                handler.handle.should.have.been.calledWith(fooCommand);
            });
        });

        describe('given an unknown command', function () {
            var thrownError;

            beforeEach(function () {
                try {
                    processor.handle({'name': 'unknown command', data: {}});
                } catch (error) {
                    thrownError = error;
                }
            });

            it('should throw an exception', function () {
                thrownError.should.equal("There is no registered handler for 'unknown command' commands.");
            });
        });
    });
});