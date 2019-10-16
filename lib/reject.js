const R = require('ramda');
const { mapConcurrent } = require('./mapConcurrent');

// Promise.all will reject on a reject from any item
const reject = R.curry (async (f, a) => {
  // Result of map will be a boolean array [true, false, ...]
  const result = await mapConcurrent (f, a);
  // Combine result booleans with original data, reject on true, and pluck the original item to return
  return R.compose (
    R.pluck (1),
    R.reject (R.head),
    R.zip,
  ) (result, a);
});

module.exports = {
  reject,
};
