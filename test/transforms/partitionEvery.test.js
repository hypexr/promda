const R = require('ramda');
const P = require('../../index');

test('partitionEvery transduce with empty data', async () => {
  const testData = [];
  const testTransducer = P.transforms.partitionEvery (10);
  const result = await P.transduce (
    testTransducer,
    R.flip (R.append),
    [],
    testData,
  );
  expect(result).toStrictEqual([]);
});

test('partitionEvery transduce, single partition', async () => {
  const testData = [1, 2, 3];
  const testTransducer = P.transforms.partitionEvery (3);
  const result = await P.transduce (
    testTransducer,
    R.flip (R.append),
    [],
    testData,
  );
  expect(result).toStrictEqual([[1, 2, 3]]);
});

test('partitionEvery transduce, multiple partitions', async () => {
  const testData = [1, 2, 3];
  const testTransducer = P.transforms.partitionEvery (2);
  const result = await P.transduce (
    testTransducer,
    R.flip (R.append),
    [],
    testData,
  );
  expect(result).toStrictEqual([[1, 2], [3]]);
});

test('partitionEvery transduce, single partition, observes reduced', async () => {
  const testData = [1, 2, 3];
  const testTransducer = P.pipeTransducer (
    R.map (
      R.when (
        R.equals (2),
        R.reduced,
      ),
    ),
    P.transforms.partitionEvery (3),
  );
  const result = await P.transduce (
    testTransducer,
    R.flip (R.append),
    [],
    testData,
  );
  expect(result).toStrictEqual([[1, 2]]);
});

test('partitionEvery transduce, multiple partitions, observes reduced', async () => {
  const testData = [1, 2, 3, 4];
  const testTransducer = P.pipeTransducer (
    R.map (
      R.when (
        R.equals (3),
        R.reduced,
      ),
    ),
    P.transforms.partitionEvery (2),
  );
  const result = await P.transduce (
    testTransducer,
    R.flip (R.append),
    [],
    testData,
  );
  expect(result).toStrictEqual([[1, 2], [3]]);
});
