'use strict';

var hasSymbols = require('has-symbols')();
var hasOwn = require('object.hasown');
var v = require('es-value-fixtures');
var FromPropertyDescriptor = require('es-abstract/2022/FromPropertyDescriptor');
var hasPropertyDescriptors = require('has-property-descriptors')();
var mockProperty = require('mock-property');
var entries = require('object.entries');

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

	t.test('descriptors supported', { skip: !hasPropertyDescriptors }, function (st) {
		st.test('test262: 15.2.3.7-2-18', function (s2t) {
			s2t.plan(1);

			var count = 0;

			s2t.teardown(mockProperty(global, 'prop', {
				get: function () {
					s2t.equal(this, global, 'getter receiver is as expected');
					count += 1;
					return {};
				},
				enumerable: true
			}));

			var thrown = false;

			var obj = {};
			try {
				defineProperties(obj, global);
			} catch (e) {
				thrown = e;
				if (!(e instanceof TypeError)) {
					s2t.fail(e); // on node 0.8 with nyc, some of the things on the global cause this to throw
				}
			}

			if (thrown !== false && count < 1) {
				s2t.ok(thrown instanceof TypeError);
			}

			s2t.end();
		});

		st.test('test262: 15.2.3.7-6-a-24', function (s2t) {
			s2t.teardown(mockProperty(
				global,
				'prop',
				{
					value: 11,
					writable: true,
					enumerable: true,
					configurable: true
				}
			));

			defineProperties(global, {
				prop: {
					value: 12
				}
			});

			s2t.deepEqual(
				Object.getOwnPropertyDescriptor(global, 'prop'),
				{
					configurable: true,
					enumerable: true,
					value: 12,
					writable: true
				}
			);

			s2t.end();
		});

		var counter = 0;
		var target = {};
		var newProperties = {
			foo: {
				get: function () {
					counter += 1;
					return counter;
				},
				enumerable: true
			},
			bar: {
				enumerable: false,
				value: 42
			}
		};

		defineProperties(target, newProperties);

		st.equal(target.foo, 1, 'getter returns 1');
		st.equal(target.foo, 2, 'getter now returns 2');
		st.equal(target.foo, 3, 'getter now returns 3');

		st.equal(target.bar, 42, 'non-enumerable "bar" has expected value');

		st.deepEqual(
			entries(target),
			[
				['foo', 4]
			],
			'enumerable properties are as expected'
		);

		st.equal(counter, 4, 'counter is incremented as expected');

		st.end();
	});
};
