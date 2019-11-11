const R = require('ramda');
const { reduceGroup } = require('./reduceGroup');

/* eslint-disable fp/no-let */

const groupWith = R.curry ((compFn, xf) => {
  return reduceGroup (
    (acc, x) => {
      acc.push (x);
      return acc;
    },
    [],
    (acc, x) => acc.length < 1 || compFn (R.last (acc), x),
    xf,
  );
});

/* eslint-enable fp/no-let */

module.exports = {
  groupWith,
};
