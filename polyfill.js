'use strict';

var implementation = require('./implementation');

module.exports = function getPolyfill() {
	return Object.defineProperties || implementation;
};
