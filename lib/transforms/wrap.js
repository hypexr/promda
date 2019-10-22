const R = require('ramda');
const { transform } = require('./transform');

const wrap = transform (R.__, (acc) => acc);

module.exports = {
  wrap,
};
