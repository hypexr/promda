const R = require('ramda');
const { transform } = require('./transforms');

/* eslint-disable fp/no-let */

const groupWith = R.curry ((comp, xf) => {
  let items = [];
  return transform (
    (acc, x) => {
      if (items.length < 1 || comp (R.last (items), x)) {
        items.push (x);
        return acc;
      }

      const result = xf['@@transducer/step'] (acc, items);
      items = [x];
      return result;
    },
    (acc) => {
      if (items.length > 0) {
        const result = xf['@@transducer/step'] (acc, items);
        if (result['@@transducer/reduced']) {
          return result['@@transducer/value'];
        }
        return result;
      }
      return acc;
    },
  );
});

/* eslint-enable fp/no-let */

module.exports = {
  groupWith,
};
