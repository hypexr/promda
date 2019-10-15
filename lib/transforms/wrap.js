const R = require('ramda');

const wrap = R.curry ((fn) => {
  return {
    '@@transducer/step': ((acc, x) => {
      return fn (acc, x);
    }),
    '@@transducer/result': ((acc) => {
      return acc;
    }),
  };
});

module.exports = {
  wrap,
};
