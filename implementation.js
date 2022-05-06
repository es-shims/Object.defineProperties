'use strict';

var RequireObjectCoercible = require('es-abstract/2021/RequireObjectCoercible');
var ObjectDefineProperties = require('es-abstract/2021/ObjectDefineProperties');

module.exports = function defineProperties(O, P) {
	RequireObjectCoercible(O);
	return ObjectDefineProperties(O, P);
};
