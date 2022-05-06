'use strict';

var hasSymbols = require('has-symbols')();
var hasOwn = require('object.hasown');
var v = require('es-value-fixtures');
var FromPropertyDescriptor = require('es-abstract/2021/FromPropertyDescriptor');

module.exports = function runTests(defineProperties, t) {
	t.test('bad O value', function (st) {
		st['throws'](function () { defineProperties(undefined); }, TypeError, 'undefined is not an object');
		st['throws'](function () { defineProperties(null); }, TypeError, 'null is not an object');
		st.end();
	});

	t.test('should define the constructor property', function (st) {
		var target = {};
		var newProperties = {
			constructor: FromPropertyDescriptor(v.assignedDescriptor('new constructor'))
		};

		st.equal(target.constructor, Object.prototype.constructor);
		st.notOk(hasOwn(target, 'contructor'));

		defineProperties(target, newProperties);

		st.equal(target.constructor, 'new constructor');

		st.end();
	});

	t.test('Symbols', { skip: !hasSymbols }, function (st) {
		var target = {};
		var newProperties = {};
		newProperties[Symbol.iterator] = FromPropertyDescriptor(v.assignedDescriptor(42));

		defineProperties(target, newProperties);

		st.deepEqual(target[Symbol.iterator], 42);

		st.end();
	});
};
