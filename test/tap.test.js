const R = require('ramda');
const P = require('../index');

const sleep = R.curry(async (time, fn) => {
  console.log('time', time);
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve(fn ());
      }, time);
    } catch (error) {
      reject(error);
    }
  });
});

test('Ramda tap does not wait', async () => {
  /* eslint-disable fp/no-let */
  let value = 1000;
  /* eslint-enable fp/no-let */
  await P.pipe ([
    R.tap (() => sleep (value, () => { value = 0; })),
  ]) (value);
  expect(value).toBe(1000);
});

test('Promda tap waits', async () => {
  /* eslint-disable fp/no-let */
  let value = 1000;
  /* eslint-enable fp/no-let */
  await P.pipe ([
    P.tap (() => sleep (value, () => { value = 0; })),
  ]) (value);
  expect(value).toBe(0);
});
