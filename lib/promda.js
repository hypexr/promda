const R = require('ramda');

const promiseAll = promises => Promise.all (promises);

// Promise.all will reject on a reject from any item
const map = R.curry ((f, a) => Promise.all (R.map (f, a)));

const reject = R.curry (async (f, a) => {
  // Result of map will be a boolean array [true, false, ...]
  const result = await map (f, a);
  // Combine result booleans with original data, reject on true, and pluck the original item to return
  return R.compose (
    R.pluck (1),
    R.reject (R.head),
    R.zip,
  ) (result, a);
});

const compose = R.composeWith ((f, result) => {
  return Promise.resolve(result).then(f);
});

const resolveSequentially = ((funcs) => {
  return R.reduce ((promise, func) => {
    if (typeof func !== 'function') {
      throw new TypeError ('Received a non function in input array.');
    }
    return promise.then((result) => {
      return func().then(Array.prototype.concat.bind(result));
    });
  }, Promise.resolve([]), funcs);
});

module.exports = {
  compose,
  map,
  promiseAll,
  reject,
  resolveSequentially,
};
