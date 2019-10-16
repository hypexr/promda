const R = require('ramda');
const P = require('../index');

test('Reduce array of values', async () => {
  const testFn = R.add;
  const testValues = [1, 2, 3, 4, 5];
  const result = await P.reduce (testFn, 0, testValues);
  expect(result).toStrictEqual(1 + 2 + 3 + 4 + 5);
});

test('Reduce array of values using box transformer', async () => {
  const testValues = [1, 2, 3, 4, 5];
  const testXForm = {
    '@@transducer/step': ((acc, x) => {
      return {
        box: R.append (x, acc.box),
      };
    }),
    '@@transducer/result': ((acc) => {
      return acc;
    }),
  };
  const result = await P.reduce (testXForm, { box: [] }, testValues);
  expect(result).toStrictEqual({ box: [1, 2, 3, 4, 5] });
});

test('Reduce array of promises with async transform step', async () => {
  const testXForm = {
    '@@transducer/step': (async (acc, x) => {
      return R.concat (acc, await x);
    }),
    '@@transducer/result': ((acc) => {
      return acc;
    }),
  };
  const withPromise = ((v) => {
    return new Promise ((resolve) => {
      resolve (v);
    });
  });
  const testValues = [
    withPromise ('hello'),
    withPromise ('how'),
    withPromise ('are'),
    withPromise ('you'),
    withPromise ('?'),
  ];
  const result = await P.reduce (testXForm, '', testValues);
  expect(result).toStrictEqual('hellohowareyou?');
});

test('Reduce sync iterator', async () => {
  const testIterator = [1, 2, 3, 4, 5].values();
  const testFn = R.flip (R.append);
  const result = await P.reduce (testFn, [], testIterator);
  expect(result).toStrictEqual([1, 2, 3, 4, 5]);
});

test('Reduce async iterator', async () => {
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
  const testFn = R.flip (R.append);
  const result = await P.reduce (testFn, [], testAsyncIterator);
  expect(result).toStrictEqual([1, 2, 3, 4, 5]);
});

test('Use R.reduced to stop reduce', async () => {
  const testValues = [1, 2, 3, 4, 5];
  const testFn = R.compose (
    R.when (
      R.compose (
        R.equals (2),
        R.length,
      ),
      R.reduced,
    ),
    R.flip (R.append),
  );
  const result = await P.reduce (testFn, [], testValues);
  expect(result).toStrictEqual([1, 2]);
});

test('Reduce async transform function with async iterator', async () => {
  const testFn = async (acc, x) => {
    return R.append (await x, acc);
  };

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
  const result = await P.reduce (testFn, [], testAsyncIterator);
  expect(result).toStrictEqual([1, 2, 3, 4, 5]);
});
