const R = require('ramda');
const { transduce } = require('./transduce');

const map = R.curry ((fn, iterable) => {
  return transduce (R.map (fn), async (acc, value) => {
    acc.push (await value);
    return acc;
  }, [], iterable);
});

module.exports = {
  map,
};
