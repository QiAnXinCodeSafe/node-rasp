'use strict';
require('../common');
const assert = require('assert');

const stringASCII_3 = 'foo';
const stringASCII_4 = 'Fooo';
const stringUTF8_3 = '😃!';
const stringASCII_300 = 'foo'.repeat(100);
const stringUTF8_300 = '😃!'.repeat(100);

const stringSet = [stringASCII_3, stringASCII_4, stringUTF8_3,
                   stringASCII_300, stringUTF8_300];

stringSet.forEach((string) => {
  const len = string.length;
  let str = string.taint('bar');


  let lowercase;

  assert.strictEqual(str.isTainted(), true);
  assert.taintEqual(str, [{ 'begin': 0, 'end': len }]);

  lowercase = str.toLowerCase();
  assert.strictEqual(lowercase.isTainted(), true);
  assert.taintEqual(lowercase, [{ 'begin': 0, 'end': len }]);

  lowercase = str.toLowerCase();
  assert.strictEqual(lowercase.isTainted(), true);
  assert.taintEqual(lowercase, [{ 'begin': 0, 'end': len }]);

  str = string + str.taint('foo');
  lowercase = str.toLowerCase();
  assert.strictEqual(lowercase.isTainted(), true);
  assert.taintEqual(lowercase, [{ 'begin': len, 'end': len + len }]);

  str = str + string;
  lowercase = str.toLowerCase();
  assert.strictEqual(lowercase.isTainted(), true);
  assert.taintEqual(lowercase, [{ 'begin': len, 'end': len + len }]);
});
