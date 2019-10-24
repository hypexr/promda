const compose = require('./lib/compose');
const composeTransducer = require('./lib/composeTransducer');
const groupWith = require('./lib/groupWith');
const head = require('./lib/head');
const map = require('./lib/map');
const mapConcurrent = require('./lib/mapConcurrent');
const preservingReduced = require('./lib/preservingReduced');
const promiseAll = require('./lib/promiseAll');
const reduce = require('./lib/reduce');
const reject = require('./lib/reject');
const take = require('./lib/take');
const transduce = require('./lib/transduce');
const transforms = require('./lib/transforms');

module.exports = {
  compose: compose.compose,
  composeTransducer: composeTransducer.composeTransducer,
  head: head.head,
  groupWith: groupWith.groupWith,
  map: map.map,
  mapConcurrent: mapConcurrent.mapConcurrent,
  preservingReduced: preservingReduced.preservingReduced,
  promiseAll: promiseAll.promiseAll,
  reduce: reduce.reduce,
  reject: reject.reject,
  take: take.take,
  transduce: transduce.transduce,
  transforms,
};
