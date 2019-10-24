const R = require('ramda');

/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable fp/no-let */
/* eslint-disable fp/no-loops */

const take = R.curry (async (n, iter) => {
  const items = [];
  for (let i = 0; i < n; i++) {
    const iterValue = await iter.next();
    if (iterValue.done) {
      break;
    }
    items.push (iterValue.value);
  }
  return items;
});

/* eslint-enable fp/no-loops */
/* eslint-enable fp/no-let */
/* eslint-enable no-plusplus */
/* eslint-enable no-await-in-loop */

module.exports = {
  take,
};
