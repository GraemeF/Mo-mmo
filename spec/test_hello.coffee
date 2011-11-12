vows = require 'vows'
assert = require 'assert'

vows.describe('Array').addBatch
	'An array':
		'with 3 elements':
			topic: [1, 2, 3, 4]

			'has a length of 3': (topic) ->
				assert.equal(topic.length, 3)

		'with zero elements':
			topic: []

			'has a length of 0': (topic) ->
				assert.equal(topic.length, 0)

			'returns *undefined*, when pop()ed': (topic) ->
				assert.isUndefined(topic.pop())
.export module
