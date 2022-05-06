'use strict';

require('../auto');

var test = require('tape');
var defineProperties = require('define-properties');

var isEnumerable = Object.prototype.propertyIsEnumerable;
var functionsHaveNames = require('functions-have-names')();

var runTests = require('./tests');

test('shimmed', function (t) {
	t.equal(Object.defineProperties.length, 2, 'Object.defineProperties has a length of 2');
	t.test('Function name', { skip: !functionsHaveNames }, function (st) {
		st.equal(Object.defineProperties.name, 'defineProperties', 'Object.defineProperties has name "defineProperties"');
		st.end();
	});

	t.test('enumerability', { skip: !defineProperties.supportsDescriptors }, function (et) {
		et.equal(false, isEnumerable.call(Object, 'defineProperties'), 'Object.defineProperties is not enumerable');
		et.end();
	});

	runTests(Object.defineProperties, t);

	t.end();
});
