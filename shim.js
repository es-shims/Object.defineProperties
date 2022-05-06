'use strict';

var getPolyfill = require('./polyfill');
var define = require('define-properties');

module.exports = function shimObjectDPs() {
	var polyfill = getPolyfill();

	define(
		Object,
		{ defineProperties: polyfill },
		{ defineProperties: function () { return Object.defineProperties !== polyfill; } }
	);

	return polyfill;
};
