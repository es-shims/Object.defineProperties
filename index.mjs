import callBind from 'call-bind';

import getPolyfill from 'object.defineproperties/polyfill';

export default callBind(getPolyfill(), Object);

export { default as getPolyfill } from 'object.defineproperties/polyfill';
export { default as implementation } from 'object.defineproperties/implementation';
export { default as shim } from 'object.defineproperties/shim';
