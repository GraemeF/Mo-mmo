var environment, server;

server = require("./server_helpers");

environment = {
  command: {
    add: function(type, location, callback) {
      process.nextTick(callback);
    }
  }
};

module.exports = environment;
