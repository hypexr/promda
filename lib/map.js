const R = require('ramda');
const { transduce } = require('./transduce');

const map = R.curry ((fn, iterable) => {
  return transduce (R.map (fn), R.flip (R.append), [], iterable);
});

module.exports = {
  map,
};
