var log;

process.env.NODE_ENV = 'test';

log = require("../../../lib/logger");

module.exports = {
  log: log,
  Character: require("./character_helpers"),
  Events: require("./events_helpers"),
  Wait: require("./wait_helpers")
};
