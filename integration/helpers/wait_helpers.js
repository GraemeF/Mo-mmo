var log, timers, wait;

log = require('../../lib/logger');

timers = require('timers');

wait = {
  For_Beats: function(beats) {
    return [
      "wait for " + beats + " beat" + (beats > 1 ? 's' : ''), function() {
        var _this = this;
        return timers.setTimeout((function() {
          return _this.callback();
        }), beats * 1000);
      }
    ];
  }
};

module.exports = wait;
