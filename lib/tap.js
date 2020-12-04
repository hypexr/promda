const R = require('ramda');

const tap = R.curry (async (fn, input) => {
  await fn (input);
  return input;
});

module.exports = {
  tap,
};
