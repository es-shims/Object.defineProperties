'use strict';

var RequireObjectCoercible = require('es-abstract/2022/RequireObjectCoercible');
var ObjectDefineProperties = require('es-abstract/2022/ObjectDefineProperties');

module.exports = function defineProperties(O, P) {
	RequireObjectCoercible(O);
	return ObjectDefineProperties(O, P);
};
