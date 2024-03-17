'use strict';

var RequireObjectCoercible = require('es-object-atoms/RequireObjectCoercible');
var ObjectDefineProperties = require('es-abstract/2024/ObjectDefineProperties');

module.exports = function defineProperties(O, P) {
	RequireObjectCoercible(O);
	return ObjectDefineProperties(O, P);
};
