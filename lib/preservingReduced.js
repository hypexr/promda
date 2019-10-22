const R = require('ramda');

const preservingReduced = R.curry ((fn, x) => {
  if (x['@@transducer/reduced']) {
    return R.reduced (fn (x['@@transducer/value']));
  }
  return fn (x);
});

module.exports = {
  preservingReduced,
};
