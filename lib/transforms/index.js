const groupWith = require('./groupWith');
const partitionEvery = require('./partitionEvery');
const preservingReducedWrap = require('./preservingReducedWrap');
const reduceGroup = require('./reduceGroup');
const transform = require('./transform');
const wrap = require('./wrap');

module.exports = {
  groupWith: groupWith.groupWith,
  partitionEvery: partitionEvery.partitionEvery,
  preservingReducedWrap: preservingReducedWrap.preservingReducedWrap,
  reduceGroup: reduceGroup.reduceGroup,
  transform: transform.transform,
  wrap: wrap.wrap,
};
