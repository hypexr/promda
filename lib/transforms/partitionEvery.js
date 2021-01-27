const R = require('ramda');
const { reduceGroup } = require('./reduceGroup');

/* eslint-disable no-unused-vars */

const partitionEvery = R.curry ((size, xf) => {
  return reduceGroup (
    (acc, x) => {
      acc.push (x);
      return acc;
    },
    () => [],
    R.identity,
    [],
    (acc, x) => acc.length < size,
    xf,
  );
});

/* eslint-enable no-unused-vars */

module.exports = {
  partitionEvery,
};
