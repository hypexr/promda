const R = require('ramda');

const preservingReduced = R.curry ((fn, x) => {
  if (x['@@transducer/reduced']) {
    return x;
  }
  return fn (x);
});

module.exports = {
  preservingReduced,
};
