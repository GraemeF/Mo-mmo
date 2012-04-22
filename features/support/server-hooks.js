var spawn = require('child_process').spawn;
var zombie = require("zombie");

var runServer = function (callback) {
    var commandProcess;
    commandProcess = spawn("node", ["lib/server"]);
    commandProcess.stdout.on('data', function (data) {
        if (data == 'Ready.\n') {
            console.log("Started", commandProcess);
            callback(null, commandProcess);
        }
    });
    commandProcess.stdout.pipe(process.stdout, {
        end:false
    });
    commandProcess.stderr.pipe(process.stderr, {
        end:false
    });
    commandProcess.on('exit', function (code, signal) {
        console.log('Server process terminated due to receipt of signal ' + signal);
    });
};


hooks = function () {
    this.Around(function (runScenario) {
        console.log("Adding hooks around a scenario");
        var world = this;

        runServer(function (error, serverProcess) {
            world.serverProcess = serverProcess;

            console.log('Creating zombie.');
            world.zombie = new zombie.Browser({
                runScripts:true,
                site:"http://localhost:3003",
                debug:true,
                userAgent:"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.7 (KHTML, like Gecko) Chrome/16.0.912.59 Safari/535.7"
            });
            zombie.visit('/index.html', function (err, newBrowser, status) {
                console.log('Running scenario.');
                world.zombie = newBrowser;

                runScenario(function (callback) {
                    console.log('Scenario finished, cleaning up.');

                    serverProcess.kill();

                    callback();
                });
            });
        });

    });
};

module.exports = hooks;