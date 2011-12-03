{exec, spawn} = require 'child_process'
fs = require 'fs'

handleError = (err) ->
  if err
    console.log "\n\033[1;36m=>\033[1;37m Remember that you need: coffee-script@0.9.4 and vows@0.5.2\033[0;37m\n"
    console.log err.stack

print = (data) -> console.log data.toString().trim()

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

##

option '-s', '--spec', 'Use Vows spec mode'

task 'build', 'Compile Coffeescript source to Javascript', ->
	fs.mkdirSync lib
	fs.mkdirSync speclib

task 'clean', 'Remove generated Javascripts', ->
	fs.rmdirSync lib
	fs.rmdirSync speclib

task 'test', 'Test the app', (options) ->
  # invoke 'build'
	walk(__dirname + "/speclib")
  args = [
    'spec/test_client.coffee'
    'spec/test_http_meta.coffee'
    'spec/test_mapper.coffee'
    'spec/test_meta.coffee'
    # 'spec/test_test_server.coffee'
  ]
  args.unshift '--spec' if options.spec

  vows = spawn 'vows', args
  vows.stdout.on 'data', print
  vows.stderr.on 'data', print

task 'dev', 'Continuous compilation', ->
  coffee = spawn 'coffee', '-wc --bare -o lib src'.split(' ')

  coffee.stdout.on 'data', print
  coffee.stderr.on 'data', print