//const map = require('./lib/map');
//const compose = require('./lib/compose');
const P = require('./lib/promda');

module.exports = {
  compose: P.compose,
  map: P.map,
  promiseAll: P.promiseAll,
  reject: P.reject,
  resolveSequentially: P.resolveSequentially,
};
