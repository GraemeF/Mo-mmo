{exec, spawn} = require 'child_process'
fs = require 'fs'
wrench = require "wrench"
path = require 'path'
{step} = require 'step'
_und = require 'underscore'

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

task 'IntegrationTests', ['Compile'], (-> runVows 'speclib/integration'), true

task 'UnitTests', ['Compile'], (-> runVows 'speclib/unit'), true

task 'AllTests', ['Compile'], (-> exec 'vows', complete), true

task 'Test', ['UnitTests', 'IntegrationTests'], ->

task('CompileSrc', [], (-> compile 'src/', 'lib/', complete), true)
task('CompileSpecs', [], (-> compile 'spec/', 'speclib/', complete), true)

task 'Compile', ['CompileSrc', 'CompileSpecs'], ->

task 'Clean', ["CleanLib","CleanSpecLib"], ->

task 'CleanLib', [], (-> wrench.rmdirRecursive "lib", complete), true
task 'CleanSpecLib', [], (-> wrench.rmdirRecursive "speclib", complete), true

desc('This is an asynchronous task.')
task('asynchronous', [], () ->
	setTimeout(() ->
		console.log("Yay, I'm asynchronous!")
		complete()
	, 1000)
, true)

task "depends", ["asynchronous"], -> console.log "done"