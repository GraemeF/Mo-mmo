http = require "http"

exports.port = port = 3003
server = (require "#{__dirname}/../../lib/app")
server.ready = (callback) ->
  if @active
    process.nextTick callback
  else
    @active = true
    server.listen port, (err,result) ->
      process.nextTick callback
  return

process.on "exit", ->
  if @active then server.close()

wait = ->
  if !@active
    process.nextTick wait
  else
    return

server.ready wait

makeRequest = (url,params,method,callback) ->
  params ||= ""
  encoding = 'utf-8'
  server.ready ->
    request = http.request
      host: "127.0.0.1"
      port: "#{port}"
      path: url
      method: "#{method}"
      headers:
        'content-type': "application/x-www-form-urlencoded"
        'content-length': params.length

    request.on 'response', (response) ->
      response.body = ''
      response.setEncoding encoding
      response.on 'data', (chunk) ->
        response.body += chunk
      response.on 'end', ->
        callback null, response
    if params
      request.write params
    request.end()


exports.server = server

exports.get = (url,params,callback) ->
  if arguments.length == 2
    callback = arguments[1]
    params = null
  makeRequest url,params,"GET",callback

exports.post = (url,params,callback) ->
  makeRequest url,params,"POST",callback