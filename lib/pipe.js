const R = require('ramda');

const pipe = R.pipeWith ((f, result) => {
  return Promise.resolve(result).then(f);
});

module.exports = {
  pipe,
};
