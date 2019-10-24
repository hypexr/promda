const R = require('ramda');
const P = require('../index');

test('Transduce array of values', async () => {
  const testTransducer = R.map (R.inc);
  const testValues = [1, 2, 3, 4, 5];
  const testFn = R.flip (R.append);
  const result = await P.transduce (testTransducer, testFn, [], testValues);
  expect(result).toStrictEqual([2, 3, 4, 5, 6]);
});

test('Transduce array of values with box transformer', async () => {
  const testTransducer = R.map (R.dec);
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
  const result = await P.transduce (testTransducer, testXForm, { box: [] }, testValues);
  expect(result).toStrictEqual({ box: [0, 1, 2, 3, 4] });
});

test('Transduce array of promises with async transform step', async () => {
  const testTransducer = R.map (
    R.then (
      R.compose (
        R.reduce (R.concat, ''),
        R.append (R.__, '*'),
      ),
    ),
  );
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
  const result = await P.transduce (testTransducer, testXForm, '', testValues);
  expect(result).toStrictEqual('*hello*how*are*you*?');
});

test('Transduce sync iterator', async () => {
  const testTransducer = R.map (R.inc);
  const testIterator = [1, 2, 3, 4, 5].values();
  const testFn = R.flip (R.append);
  const result = await P.transduce (testTransducer, testFn, [], testIterator);
  expect(result).toStrictEqual([2, 3, 4, 5, 6]);
});

test('Transduce async iterator', async () => {
  const testTransducer = R.map (R.inc);

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
  const result = await P.transduce (testTransducer, testFn, [], testAsyncIterator);
  expect(result).toStrictEqual([2, 3, 4, 5, 6]);
});

test('Use R.reduced to stop transduce', async () => {
  const testTransducer = R.map (R.inc);
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
  const result = await P.transduce (testTransducer, testFn, [], testValues);
  expect(result).toStrictEqual([2, 3]);
});

test('Transduce async transform function with async iterator', async () => {
  const testTransducer = R.map (R.inc);
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
  const result = await P.transduce (testTransducer, testFn, [], testAsyncIterator);
  expect(result).toStrictEqual([2, 3, 4, 5, 6]);
});

test('Transduce preserves transducer reduced', async () => {
  const testTransducer = P.composeTransducer (
    R.map (
      P.preservingReduced (
        R.when (
          R.equals (2),
          R.inc,
        ),
      ),
    ),
    R.map (
      P.preservingReduced (
        R.compose (
          R.when (R.equals (3), R.reduced),
          R.inc,
        ),
      ),
    ),
  );
  const testValues = [1, 2, 3, 4, 5];
  const testFn = R.flip (R.append);
  const result = await P.transduce (testTransducer, testFn, [], testValues);
  expect(result).toStrictEqual([3, 3]);
});
