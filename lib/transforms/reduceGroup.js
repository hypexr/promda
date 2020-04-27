const R = require('ramda');
const { transform } = require('./transform');

/* eslint-disable fp/no-let */

const reduceGroup = R.curry ((valueFn, initialVal, compFn, xf) => {
  let accumedObj = R.clone (initialVal);
  const step = R.bind(xf['@@transducer/step'], xf);
  const result = R.bind(xf['@@transducer/result'], xf);

  return transform (
    (acc, x) => {
      if (compFn (accumedObj, x)) {
        if (x['@@transducer/reduced']) {
          accumedObj = valueFn (accumedObj, x['@@transducer/value']);
          return R.reduced (acc);
        }
        accumedObj = valueFn (accumedObj, x);
        return acc;
      }

      const accumed = step (acc, accumedObj);
      if (x['@@transducer/reduced']) {
        accumedObj = valueFn (R.clone (initialVal), x['@@transducer/value']);
        return R.reduced (accumed);
      }
      accumedObj = valueFn (R.clone (initialVal), x);
      return accumed;
    },
    async (acc) => {
      if (!R.isEmpty (accumedObj)) {
        const accumed = await step (acc, accumedObj);
        if (!R.isNil (accumed) && accumed['@@transducer/reduced']) {
          return result (accumed['@@transducer/value']);
        }
        return result (accumed);
      }
      return result (acc);
    },
  );
});

/* eslint-enable fp/no-let */

module.exports = {
  reduceGroup,
};
