const R = require('ramda');
const { transduce } = require('./transduce');

const map = R.curry ((fn, iterable) => {
  return transduce (R.map (fn), (acc, value) => {
    acc.push (value);
    return acc;
  }, [], iterable);
});

module.exports = {
  map,
};
