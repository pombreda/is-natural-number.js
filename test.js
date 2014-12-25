'use strict';

var requireUncached = require('require-uncached');
var test = require('tape');

var bowerMainPath = './' + require('./bower.json').main;

function runTest(description, main) {
  test(description, function(t) {
    t.plan(29);

    t.equal(main.name, 'isNaturalNumber');

    t.ok(main(1));
    t.ok(main(1e+1));
    t.ok(main(9007199254740992 - 1));

    t.notOk(main(0));
    t.notOk(main(1.5));
    t.notOk(main(1e-1));
    t.notOk(main(1.0000000000005));
    t.notOk(main(9007199254740992));
    t.notOk(main('1'));
    t.notOk(main(['10']));
    t.notOk(main(['2']));
    t.notOk(main(['0', '1']));
    t.notOk(main({number: 1}));
    t.notOk(main(/123/));
    t.notOk(main(Infinity));
    t.notOk(main(-Infinity));
    t.notOk(main(Number.MAX_VALUE));
    t.notOk(main(Number.MIN_VALUE));
    t.notOk(main(-Infinity));
    t.notOk(main(NaN));
    t.notOk(main(Number));
    t.notOk(main(false));
    t.notOk(main(true));
    t.notOk(main(this));
    t.notOk(main(null));
    t.notOk(main(undefined));

    t.ok(main(0, true));
    t.notOk(main(0, false));
  });
}

global.window = {};

Number.isInteger = null;
requireUncached(bowerMainPath);

runTest('Test for require(\'is-natural-number\')', requireUncached('./'));
runTest('window.isNaturalNumber', window.isNaturalNumber);

Number.isInteger = require('is-integer');
require(bowerMainPath);

runTest('Test for require(\'is-natural-number\') on ES6 environment', require('./'));
runTest('window.isNaturalNumber on ES6 environment', window.isNaturalNumber);
