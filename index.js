const compose = require('./lib/compose');
const map = require('./lib/map');
const mapConcurrent = require('./lib/mapConcurrent');
const promiseAll = require('./lib/promiseAll');
const reduce = require('./lib/reduce');
const reject = require('./lib/reject');
const transduce = require('./lib/transduce');

module.exports = {
  compose: compose.compose,
  map: map.map,
  mapConcurrent: mapConcurrent.mapConcurrent,
  promiseAll: promiseAll.promiseAll,
  reduce: reduce.reduce,
  reject: reject.reject,
  transduce: transduce.transduce,
};
