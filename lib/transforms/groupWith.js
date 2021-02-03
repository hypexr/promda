const R = require('ramda');
const { reduceGroup } = require('./reduceGroup');

const groupWith = R.curry ((compFn, xf) => {
  return reduceGroup (
    (acc, x) => {
      acc.push (x);
      return acc;
    },
    () => [],
    R.identity,
    [],
    (acc, x) => acc.length < 1 || compFn (R.last (acc), x),
    xf,
  );
});

module.exports = {
  groupWith,
};
