const compose = require('./lib/compose');
const map = require('./lib/map');
const mapConcurrent = require('./lib/mapConcurrent');
const preservingReduced = require('./lib/preservingReduced');
const promiseAll = require('./lib/promiseAll');
const reduce = require('./lib/reduce');
const reject = require('./lib/reject');
const transduce = require('./lib/transduce');
const transforms = require('./lib/transforms');

module.exports = {
  compose: compose.compose,
  map: map.map,
  mapConcurrent: mapConcurrent.mapConcurrent,
  preservingReduced: preservingReduced.preservingReduced,
  promiseAll: promiseAll.promiseAll,
  reduce: reduce.reduce,
  reject: reject.reject,
  transduce: transduce.transduce,
  transforms,
};
