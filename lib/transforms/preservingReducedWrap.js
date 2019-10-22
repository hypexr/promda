const R = require('ramda');
const { preservingReduced } = require('../preservingReduced');
const { transform } = require('./transform');

const preservingReducedWrap = R.curry ((fn) => {
  return transform (
    (acc, x) => preservingReduced ((v) => fn (acc, v), x),
    (acc) => acc,
  );
});

module.exports = {
  preservingReducedWrap,
};
