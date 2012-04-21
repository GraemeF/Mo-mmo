var spawn = require('child_process').spawn;

var runServer = function () {
    var commandProcess;
    commandProcess = spawn("node", ["lib/server"]);
    commandProcess.stdout.pipe(process.stdout, {
        end:false
    });
    commandProcess.stderr.pipe(process.stderr, {
        end:false
    });
    commandProcess.on('exit', function (code, signal) {
        console.log('Server process terminated due to receipt of signal ' + signal);
    });
    console.log("Started", commandProcess);
    return commandProcess;
};

hooks = function() {
    this.Around(function(runScenario) {
        console.log("Adding hooks around a scenario");
        var serverProcess = runServer();

        runScenario(function(callback) {
            // Now, we can do our "after scenario" stuff:
            console.log('Scenario finished, cleaning up.');

            serverProcess.kill();

            callback();
        });
    });
};

module.exports = hooks;