const applySpec = require('./lib/applySpec');
const compose = require('./lib/compose');
const composeTransducer = require('./lib/composeTransducer');
const head = require('./lib/head');
const map = require('./lib/map');
const mapConcurrent = require('./lib/mapConcurrent');
const pipe = require('./lib/pipe');
const pipeTransducer = require('./lib/pipeTransducer');
const preservingReduced = require('./lib/preservingReduced');
const promiseAll = require('./lib/promiseAll');
const reduce = require('./lib/reduce');
const reject = require('./lib/reject');
const take = require('./lib/take');
const tap = require('./lib/tap');
const transduce = require('./lib/transduce');
const transforms = require('./lib/transforms');

module.exports = {
  applySpec: applySpec.applySpec,
  compose: compose.compose,
  composeTransducer: composeTransducer.composeTransducer,
  head: head.head,
  map: map.map,
  mapConcurrent: mapConcurrent.mapConcurrent,
  pipe: pipe.pipe,
  pipeTransducer: pipeTransducer.pipeTransducer,
  preservingReduced: preservingReduced.preservingReduced,
  promiseAll: promiseAll.promiseAll,
  reduce: reduce.reduce,
  reject: reject.reject,
  take: take.take,
  tap: tap.tap,
  transduce: transduce.transduce,
  transforms,
};
