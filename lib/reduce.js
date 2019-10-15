const R = require('ramda');
const { transduce } = require('./transduce');

const reduce = R.curry ((fn, acc, iterable) => {
  return transduce (R.identity, fn, acc, iterable);
});

module.exports = {
  reduce,
};
