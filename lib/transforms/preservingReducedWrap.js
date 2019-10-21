const R = require('ramda');

const preservingReducedWrap = R.curry ((fn) => {
  return {
    '@@transducer/step': ((acc, x) => {
      if (x['@@transducer/reduced']) {
        return R.reduced (acc);
      }
      return fn (acc, x);
    }),
    '@@transducer/result': ((acc) => {
      return acc;
    }),
  };
});

module.exports = {
  preservingReducedWrap,
};
