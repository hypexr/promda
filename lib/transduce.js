const R = require('ramda');
const { wrap } = require('./transforms/wrap');

/* eslint-disable no-await-in-loop */
/* eslint-disable fp/no-let */
/* eslint-disable fp/no-loops */

const transduce = R.curry (async (trans, fn, acc, iterable) => {
  const xf = trans (R.is (Function, fn) ? wrap(fn) : fn);
  const step = R.bind(xf['@@transducer/step'], xf);
  const result = R.bind(xf['@@transducer/result'], xf);
  const iter = R.is (Array, iterable) ? iterable.values() : iterable;

  let accumed = acc;
  let iterResult = await iter.next();
  while (!iterResult.done) {
    accumed = await step(accumed, iterResult.value);
    if (!R.isNil (accumed) && await accumed['@@transducer/reduced']) {
      accumed = await accumed['@@transducer/value'];
      break;
    }
    iterResult = await iter.next();
  }
  return result(accumed);
});

/* eslint-enable fp/no-loops */
/* eslint-enable fp/no-let */
/* eslint-enable no-await-in-loop */

module.exports = {
  transduce,
};
