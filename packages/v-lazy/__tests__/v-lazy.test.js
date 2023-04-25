'use strict';

const vLazy = require('..');
const assert = require('assert').strict;

assert.strictEqual(vLazy(), 'Hello from vLazy');
console.info('vLazy tests passed');
