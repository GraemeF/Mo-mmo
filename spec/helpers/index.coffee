process.env.NODE_ENV = 'test'

module.exports =
  Server:  require "#{__dirname}/server_helpers"
  Test:  require "#{__dirname}/test_helpers"