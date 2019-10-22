const preservingReducedWrap = require('./preservingReducedWrap');
const transform = require('./transform');
const wrap = require('./wrap');

module.exports = {
  preservingReducedWrap: preservingReducedWrap.preservingReducedWrap,
  transform: transform.transform,
  wrap: wrap.wrap,
};
