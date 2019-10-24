const R = require('ramda');

const head = R.curry (async (iter) => {
  return (await iter.next()).value;
});

module.exports = {
  head,
};
