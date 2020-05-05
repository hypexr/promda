const R = require('ramda');
const P = require('../../index');

test('groupWith transduce with empty data', async () => {
  const testData = [];
  const testTransducer = P.transforms.groupWith (R.lte);
  const result = R.transduce (
    testTransducer,
    R.flip (R.append),
    [],
    testData,
  );
  expect(result).toStrictEqual([]);
});

test('groupWith transduce with small data', async () => {
  const testData = [1];
  const testTransducer = P.transforms.groupWith (R.lte);
  const result = R.transduce (
    testTransducer,
    R.flip (R.append),
    [],
    testData,
  );
  expect(result).toStrictEqual([[1]]);
});

test('groupWith transduce', async () => {
  const testData = [1, 2, 3, 2, 1, 0];
  const testTransducer = P.transforms.groupWith (R.lte);
  const result = R.transduce (
    testTransducer,
    R.flip (R.append),
    [],
    testData,
  );
  expect(result).toStrictEqual([[1, 2, 3], [2], [1], [0]]);
});

test('groupWith transduce removes result reduced', async () => {
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
    P.transforms.groupWith (R.lte),
  );
  const result = R.transduce (
    testTransducer,
    P.transforms.preservingReducedWrap (R.flip (R.append)),
    [],
    testData,
  );
  expect(result).toStrictEqual([[2, 3], [2], [1], [0]]);
});

test('groupWith transduce uses transform result', async () => {
  const testData = [1, 2, 3, 2, 1, 0];
  const testTransducer = P.transforms.groupWith (R.lte);
  const result = R.transduce (
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
