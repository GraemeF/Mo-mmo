var exec, executeCommandLine, spawn, _ref;

_ref = require('child_process'), exec = _ref.exec, spawn = _ref.spawn;

executeCommandLine = function(commandLine) {
  var commandProcess;
  commandProcess = exec(commandLine);
  commandProcess.stdout.pipe(process.stdout, {
    end: false
  });
  return commandProcess.stderr.pipe(process.stderr, {
    end: false
  });
};

module.exports = {
  HasBeenStarted: function() {
    return [
      "server has been started", function() {
        this.server = executeCommandLine('node lib/server');
        return this.callback();
      }
    ];
  }
};
