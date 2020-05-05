const groupWith = require('./groupWith');
const groupWithAsync = require('./groupWithAsync');
const partitionEvery = require('./partitionEvery');
const preservingReducedWrap = require('./preservingReducedWrap');
const reduceGroup = require('./reduceGroup');
const reduceGroupAsync = require('./reduceGroupAsync');
const transform = require('./transform');
const wrap = require('./wrap');

module.exports = {
  groupWith: groupWith.groupWith,
  groupWithAsync: groupWithAsync.groupWithAsync,
  partitionEvery: partitionEvery.partitionEvery,
  preservingReducedWrap: preservingReducedWrap.preservingReducedWrap,
  reduceGroup: reduceGroup.reduceGroup,
  reduceGroupAsync: reduceGroupAsync.reduceGroupAsync,
  transform: transform.transform,
  wrap: wrap.wrap,
};
