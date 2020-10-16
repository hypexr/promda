const R = require('ramda');

/* eslint-disable no-param-reassign */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable fp/no-let */
/* eslint-disable fp/no-loops */

const mapValues = (specObj, inObj, promises) => {
  Object.entries(specObj).forEach(([key, val]) => {
    if (typeof (val) === 'function') {
      const ret = val (inObj);
      if (ret instanceof Promise) {
        promises.push ([specObj, key, ret]);
      }
      specObj[key] = ret;
    } else {
      specObj[key] = mapValues (val, inObj, promises);
    }
  });
  return specObj;
};

const applySpec = R.curry (async (specObj, inObj) => {
  const promises = [];
  const retSpecObj = mapValues (specObj, inObj, promises);
  for (let i = 0; i < promises.length; ++i) {
    const [promiseObj, promiseKey, promise] = promises[i];
    promiseObj[promiseKey] = await promise;
  }
  return retSpecObj;
});

/* eslint-enable fp/no-loops */
/* eslint-enable fp/no-let */
/* eslint-enable no-plusplus */
/* eslint-enable no-await-in-loop */
/* eslint-enable no-param-reassign */

module.exports = {
  applySpec,
};
