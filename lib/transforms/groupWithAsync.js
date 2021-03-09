const R = require('ramda');
const { reduceGroupAsync } = require('./reduceGroupAsync');

const groupWithAsync = R.curry ((compFn, xf) => {
  return reduceGroupAsync (
    (acc, x) => {
      acc.push (x);
      return acc;
    },
    () => [],
    R.identity,
    R.identity,
    [],
    (acc, x) => acc.length < 1 || compFn (R.last (acc), x),
    xf,
  );
});

module.exports = {
  groupWithAsync,
};
