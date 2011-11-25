winston = require('winston')

log =	new winston.Logger
		transports: [new winston.transports.Console()]
		exceptionHandlers: [new winston.transports.Console({ filename: 'exceptions.log' })]

log.debug "Loading #{__filename}"

module.exports = log