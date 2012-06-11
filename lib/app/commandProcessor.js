var CommandProcessor, logger;

logger = require('../logger');

CommandProcessor = (function () {

    function CommandProcessor() {
        this.handlerFactories = {};
    }

    CommandProcessor.prototype.handle = function (command) {
        var factory, handler;
        factory = this.handlerFactories[command.name];
        if (factory != null) {
            handler = factory.createHandler();
            console.log(handler);
            return handler.handle(command);
        } else {
            throw "There is no registered handler for '" + command.name + "' commands.";
        }
    };

    return CommandProcessor;

})();

module.exports = CommandProcessor;
