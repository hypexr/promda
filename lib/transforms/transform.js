const R = require('ramda');

const transform = R.curry ((step, result) => {
  return {
    '@@transducer/step': step,
    '@@transducer/result': result,
  };
});

module.exports = {
  transform,
};
