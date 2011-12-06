{exec, spawn} = require 'child_process'
fs = require 'fs'
wrench = require "wrench"
path = require 'path'
{step} = require 'step'
_und = require 'underscore'
fileutils = require 'fileutils/fileutils.js'

walk = (dir, done) ->
  results = []
  fs.readdir dir, (err, list) ->
    return done(err)  if err
    i = 0
    (next = ->
      file = list[i++]
      return done(null, results)  unless file
      file = dir + "/" + file
      fs.stat file, (err, stat) ->
        if stat and stat.isDirectory()
          walk file, (err, res) ->
            results = results.concat(res)
            next()
        else
          results.push file
          next()
    )()

strEndsWith = (str, suffix) ->
	str.match(suffix + "$") == suffix

runVows = (directory) ->
	walk directory, (err, files) ->
		specFiles = _und(files).filter((file)-> (file.indexOf '-spec') != -1)
		executeCommandLine "vows #{specFiles.join ' '}", complete

compile = (input, output, callback) ->
	executeCommandLine "coffee --bare --compile --output #{output} #{input}", callback

executeCommandLine = (commandLine, callback) ->
	commandProcess = exec commandLine
	commandProcess.stdout.pipe process.stdout, { end: false }
	commandProcess.stderr.pipe process.stderr, { end: false }
	commandProcess.on 'exit', callback

##

desc 'Default task.'
task 'default', ['Test'], ->

task 'Test', ['UnitTests', 'IntegrationTests', 'EndToEndTests'], ->
task 'EndToEndTests', ['Compile', 'IntegrationTests', 'CompileUI'], (-> runVows 'speclib/endtoend'), true
task 'IntegrationTests', ['Compile', 'UnitTests'], (-> runVows 'speclib/integration'), true
task 'UnitTests', ['Compile'], (-> runVows 'speclib/unit'), true
task 'AllTests', ['Compile'], (-> exec 'vows', complete), true

task 'Compile', ['CompileSrc', 'CompileSpecs'], ->
task('CompileSrc', [], (-> compile 'src/', 'lib/', complete), true)
task('CompileSpecs', [], (-> compile 'spec/', 'speclib/', complete), true)
task('CompileUI', ["CopyUI"], (-> compile 'lib/ui/', 'lib/ui/', complete), true)
task('CopyUI', [], (->
	wrench.copyDirSyncRecursive './src/ui', './lib/ui'
	fileutils.copyFileIntoDir './node_modules/socket.io-client/dist/socket.io.js', './lib/ui/scripts/libs'
	), false)

task 'Clean', ["CleanLib","CleanSpecLib"], ->
task 'CleanLib', [], (-> wrench.rmdirRecursive "lib", complete), true
task 'CleanSpecLib', [], (-> wrench.rmdirRecursive "speclib", complete), true