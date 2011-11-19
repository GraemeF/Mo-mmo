process.env.NODE_ENV = 'test'

module.exports =
	Server:				require "#{__dirname}/server_helpers"
	Test:					require "#{__dirname}/test_helpers"
	Character:		require "#{__dirname}/character_helpers"
	Environment:	require "#{__dirname}/environment_helpers"