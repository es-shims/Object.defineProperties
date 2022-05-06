import index, * as Module from 'object.defineproperties';
import test from 'tape';
import runTests from './tests.js';

test('as a function', (t) => {
	runTests(index, t);

	t.end();
});

test('named exports', async (t) => {
	t.deepEqual(
		Object.keys(Module).sort(),
		['default', 'shim', 'getPolyfill', 'implementation'].sort(),
		'has expected named exports',
	);

	const { shim, getPolyfill, implementation } = Module;
	t.equal((await import('object.defineproperties/shim')).default, shim, 'shim named export matches deep export');
	t.equal((await import('object.defineproperties/implementation')).default, implementation, 'implementation named export matches deep export');
	t.equal((await import('object.defineproperties/polyfill')).default, getPolyfill, 'getPolyfill named export matches deep export');

	t.end();
});
