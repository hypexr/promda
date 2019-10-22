const R = require('ramda');
const P = require('../index');

test('Map array of values', async () => {
  const testFn = R.inc;
  const testValues = [1, 2, 3, 4, 5];
  const result = await P.map (testFn, testValues);
  expect(result).toStrictEqual([2, 3, 4, 5, 6]);
});

test('Map sync iterator', async () => {
  const testFn = R.inc;
  const testIterator = [1, 2, 3, 4, 5].values();
  const result = await P.map (testFn, testIterator);
  expect(result).toStrictEqual([2, 3, 4, 5, 6]);
});

test('Map async iterator', async () => {
  const testFn = R.inc;

  /* eslint-disable func-names */
  const testAsyncGenerator = (async function* () {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
  });
  /* eslint-enable func-names */

  const testAsyncIterator = testAsyncGenerator();
  const result = await P.map (testFn, testAsyncIterator);
  expect(result).toStrictEqual([2, 3, 4, 5, 6]);
});

test('Map async function with async iterator', async () => {
  const testFn = (v) => new Promise ((resolve) => {
    resolve (R.inc (v));
  });

  /* eslint-disable func-names */
  const testAsyncGenerator = (async function* () {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
  });
  /* eslint-enable func-names */

  const testAsyncIterator = testAsyncGenerator();
  const result = await P.map (testFn, testAsyncIterator);
  expect(result).toStrictEqual([2, 3, 4, 5, 6]);
});

test('Map respects reduced', async () => {
  const testFn = R.compose (
    R.when (R.equals (3), R.reduced),
    R.inc,
  );
  const testValues = [1, 2, 3, 4, 5];
  const result = await P.map (testFn, testValues);
  expect(result).toStrictEqual([2, 3]);
});
