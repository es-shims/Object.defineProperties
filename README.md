# object.defineproperties <sup>[![Version Badge][npm-version-svg]][package-url]</sup>

[![github actions][actions-image]][actions-url]
[![coverage][codecov-image]][codecov-url]
[![dependency status][deps-svg]][deps-url]
[![dev dependency status][dev-deps-svg]][dev-deps-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

[![npm badge][npm-badge-png]][package-url]

An ES spec-compliant `Object.defineProperties` shim. Invoke its "shim" method to shim `Object.defineProperties` if it is unavailable or noncompliant.

This package implements the [es-shim API](https://github.com/es-shims/api) interface. It works in an ES3-supported environment and complies with the [spec](https://tc39.es/ecma262/#sec-object.defineproperties).

Most common usage:
```js
var assert = require('assert');
var defineProperties = require('object.defineproperties');

var descriptors = {
	a: {
		value: 2
	},
	c: {
		configurable: true,
		enumerable: true,
		value: 3,
		writable: true
	}
};

var obj = { a: 1, b: 2 };
var result = defineProperties(obj, descriptors);

assert.equal(obj, result); // same object
assert.deepEqual(obj, { a: 2, b: 2, c: 3 });

defineProperties.shim();

assert.deepEqual(
	Object.defineProperties({ a: 1, b: 2 }, descriptors),
	defineProperties({ a: 1, b: 2 }, descriptors)
);
```

## Tests
Simply clone the repo, `npm install`, and run `npm test`

[package-url]: https://npmjs.com/package/object.defineproperties
[npm-version-svg]: https://versionbadg.es/es-shims/Object.defineProperties.svg
[deps-svg]: https://david-dm.org/es-shims/Object.defineProperties.svg
[deps-url]: https://david-dm.org/es-shims/Object.defineProperties
[dev-deps-svg]: https://david-dm.org/es-shims/Object.defineProperties/dev-status.svg
[dev-deps-url]: https://david-dm.org/es-shims/Object.defineProperties#info=devDependencies
[npm-badge-png]: https://nodei.co/npm/object.defineproperties.png?downloads=true&stars=true
[license-image]: https://img.shields.io/npm/l/object.defineproperties.svg
[license-url]: LICENSE
[downloads-image]: https://img.shields.io/npm/dm/object.defineproperties.svg
[downloads-url]: https://npm-stat.com/charts.html?package=object.defineproperties
[codecov-image]: https://codecov.io/gh/es-shims/Object.defineProperties/branch/main/graphs/badge.svg
[codecov-url]: https://app.codecov.io/gh/es-shims/Object.defineProperties/
[actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/es-shims/Object.defineProperties
[actions-url]: https://github.com/es-shims/Object.defineProperties/actions
