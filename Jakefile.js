var exec = require('child_process').exec;
var fs = require('fs');
var path = require('path');
var step = require('step').step;
var _und = require('underscore');

function walk(dir, done) {
  var results;
  results = [];
  return fs.readdir(dir, function(err, list) {
    var i, next;
    if (err) return done(err);
    i = 0;
    return (next = function() {
      var file;
      file = list[i++];
      if (!file) return done(null, results);
      file = dir + "/" + file;
      return fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          return walk(file, function(err, res) {
            results = results.concat(res);
            return next();
          });
        } else {
          results.push(file);
          return next();
        }
      });
    })();
  });
}

function executeCommandLine(commandLine, callback) {
  var commandProcess;
  commandProcess = exec(commandLine);
  commandProcess.stdout.pipe(process.stdout, {
    end: false
  });
  commandProcess.stderr.pipe(process.stderr, {
    end: false
  });
  return commandProcess.on('exit', callback);
}

function runVows(directory) {
  return walk(directory, function(err, files) {
    var specFiles;
    specFiles = _und(files).filter(function(file) {
      return (file.indexOf('-spec')) !== -1;
    });
    return executeCommandLine("vows " + (specFiles.join(' ')), complete);
  });
}

desc('Default task.');
task('default', ['Test'], function() {});

task('Test', ['UnitTests', 'IntegrationTests', 'EndToEndTests'], function() {});

task('EndToEndTests', ['IntegrationTests'], (function() {
  return runVows('spec/endtoend');
}), true);

task('IntegrationTests', ['UnitTests'], (function() {
  return runVows('spec/integration');
}), true);

task('UnitTests', [], (function() {
  return runVows('spec/unit');
}), true);

task('AllTests', [], (function() {
  return exec('vows', complete);
}), true);