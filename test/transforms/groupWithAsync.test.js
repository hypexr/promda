const R = require('ramda');
const P = require('../../index');

test('groupWithAsync transduce with empty data', async () => {
  const testData = [];
  const testTransducer = P.transforms.groupWithAsync (R.lte);
  const result = await P.transduce (
    testTransducer,
    R.flip (R.append),
    [],
    testData,
  );
  expect(result).toStrictEqual([]);
});

test('groupWithAsync transduce with small data', async () => {
  const testData = [1];
  const testTransducer = P.transforms.groupWithAsync (R.lte);
  const result = await P.transduce (
    testTransducer,
    R.flip (R.append),
    [],
    testData,
  );
  expect(result).toStrictEqual([[1]]);
});

test('groupWithAsync transduce', async () => {
  const testData = [1, 2, 3, 2, 1, 0];
  const testTransducer = P.transforms.groupWithAsync (R.lte);
  const result = await P.transduce (
    testTransducer,
    R.flip (R.append),
    [],
    testData,
  );
  expect(result).toStrictEqual([[1, 2, 3], [2], [1], [0]]);
});

test('groupWithAsync transduce removes result reduced', async () => {
  const testData = [2, 3, 2, 1, 0, -1, -2];
  const testTransducer = P.composeTransducer (
    R.map (
      R.when (
        R.compose (
          R.gte (1),
          R.head,
        ),
        R.reduced,
      ),
    ),
    P.transforms.groupWithAsync (R.lte),
  );
  const result = await P.transduce (
    testTransducer,
    R.flip (R.append),
    [],
    testData,
  );
  expect(result).toStrictEqual([[2, 3], [2], [1], [0]]);
});

test('groupWithAsync transduce uses transform result', async () => {
  const testData = [1, 2, 3, 2, 1, 0];
  const testTransducer = P.transforms.groupWithAsync (R.lte);
  const result = await P.transduce (
    testTransducer,
    P.transforms.transform (
      R.flip (R.append),
      R.compose (
        R.map (R.inc),
        R.flatten,
      ),
    ),
    [],
    testData,
  );
  expect(result).toStrictEqual([2, 3, 4, 3, 2, 1]);
});
