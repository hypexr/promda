const R = require('ramda');
const { transform } = require('./transforms');

/* eslint-disable fp/no-let */

const groupWith = R.curry ((comp, xf) => {
  let items = [];
  const step = R.bind(xf['@@transducer/step'], xf);
  const result = R.bind(xf['@@transducer/result'], xf);
  return transform (
    (acc, x) => {
      if (items.length < 1 || comp (R.last (items), x)) {
        items.push (x);
        return acc;
      }

      const accumed = step (acc, items);
      items = [x];
      return accumed;
    },
    async (acc) => {
      if (items.length > 0) {
        const accumed = await step (acc, items);
        if (!R.isNil (accumed) && accumed['@@transducer/reduced']) {
          return result (await accumed['@@transducer/value']);
        }
        return result (accumed);
      }
      return result (acc);
    },
  );
});

/* eslint-enable fp/no-let */

module.exports = {
  groupWith,
};
