var zombie = require('zombie');

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
console.log("foo");

var World = function World(callback) {
    console.log("bar");
    this.serverProcess = runServer();
    var cb = callback;
    setTimeout(function () {
        cb();
    }, 2000);

    this.browser = new zombie.Browser();

    this.visit = function (url, callback) {
        this.browser.visit(url, callback);
    };
};

exports.World = World;