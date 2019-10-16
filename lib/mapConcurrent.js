const R = require('ramda');
const { reduce } = require('./reduce');

const mapConcurrent = R.curry (async (fn, iterable) => {
  return Promise.all (await reduce ((acc, value) => {
    acc.push (fn (value));
    return acc;
  }, [], iterable));
});

module.exports = {
  mapConcurrent,
};
