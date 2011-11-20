winston = require('winston')

module.exports =
	new winston.Logger(
		transports: [new winston.transports.Console()]
		exceptionHandlers: [new winston.transports.Console({ filename: 'exceptions.log' })])