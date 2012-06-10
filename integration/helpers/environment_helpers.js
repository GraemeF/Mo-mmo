var environment = {
    command: {
        add: function (type, location, callback) {
            process.nextTick(callback);
        }
    }
};

module.exports = environment;
