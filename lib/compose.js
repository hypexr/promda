const R = require('ramda');

const compose = R.composeWith ((f, result) => {
  return Promise.resolve(result).then(f);
});

module.exports = {
  compose,
};
