const R = require('ramda');
const P = require('../../index');

test('reduceGroup transduce with empty data', async () => {
  const testData = [];
  const key = 'testKey';
  const testValueFn = (acc, x) => {
    return R.assoc (key, R.append (x, acc[key]), acc);
  };
  const testCompFn = (acc, x) => {
    if (R.isEmpty (acc)) {
      return true;
    }
    return R.lte (R.last (acc), x);
  };
  const testTransducer = P.transforms.reduceGroup (testValueFn, () => ([]), R.identity, R.identity, [], testCompFn);
  const result = R.transduce (
    testTransducer,
    R.flip (R.append),
    [],
    testData,
  );
  expect(result).toStrictEqual([]);
});

test('reduceGroup transduce with small data', async () => {
  const testData = [1];
  const key = 'testKey';
  const testValueFn = (acc, x) => {
    return R.assoc (key, R.append (x, acc[key]), acc);
  };
  const testCompFn = (acc, x) => {
    if (R.isEmpty (acc[key])) {
      return true;
    }
    return R.lte (R.last (acc[key]), x);
  };
  const testTransducer = P.transforms.reduceGroup (testValueFn, () => ({ [key]: [] }), R.identity, R.identity, { [key]: [] }, testCompFn);
  const result = R.transduce (
    testTransducer,
    R.flip (R.append),
    [],
    testData,
  );
  expect(result).toStrictEqual([{ testKey: [1] }]);
});

test('reduceGroup transduce', async () => {
  const testData = [1, 2, 3, 2, 1, 0];
  const key = 'testKey';
  const testValueFn = (acc, x) => {
    return R.assoc (key, R.append (x, acc[key]), acc);
  };
  const testCompFn = (acc, x) => {
    if (R.isEmpty (acc[key])) {
      return true;
    }
    return R.lte (R.last (acc[key]), x);
  };
  const testTransducer = P.transforms.reduceGroup (testValueFn, () => ({ [key]: [] }), R.identity, R.identity, { [key]: [] }, testCompFn);
  const result = R.transduce (
    testTransducer,
    R.flip (R.append),
    [],
    testData,
  );
  expect(result).toStrictEqual([{ testKey: [1, 2, 3] }, { testKey: [2] }, { testKey: [1] }, { testKey: [0] }]);
});

test('reduceGroup transduce removes result reduced', async () => {
  const testData = [2, 3, 2, 1, 0, -1, -2];
  const key = 'testKey';
  const testValueFn = (acc, x) => {
    return R.assoc (key, R.append (x, acc[key]), acc);
  };
  const testCompFn = (acc, x) => {
    if (R.isEmpty (acc[key])) {
      return true;
    }
    return R.lte (R.last (acc[key]), x);
  };
  const testTransducer = P.composeTransducer (
    R.map (
      R.when (
        R.compose (
          R.gte (1),
          R.head,
          R.path (['testKey']),
        ),
        R.reduced,
      ),
    ),
    P.transforms.reduceGroup (testValueFn, () => ({ [key]: [] }), R.identity, R.identity, { [key]: [] }, testCompFn),
  );
  const result = R.transduce (
    testTransducer,
    P.transforms.preservingReducedWrap (R.flip (R.append)),
    [],
    testData,
  );
  expect(result).toStrictEqual ([{ testKey: [2, 3] }, { testKey: [2] }, { testKey: [1] }, { testKey: [0] }]);
});

test('reduceGroup transduce observes reduced', async () => {
  const testData = [1, 2, 3, 4];
  const testValueFn = ((acc, x) => {
    acc.push(x);
    return acc;
  });
  const testCompFn = ((acc) => {
    if (R.isEmpty (acc)) {
      return true;
    }
    return R.length (acc) + 1 < 3;
  });
  const testTransducer = P.pipeTransducer (
    R.map (R.inc),
    R.map (
      R.when (
        R.equals (4),
        R.reduced,
      ),
    ),
    P.transforms.reduceGroup (testValueFn, () => ([]), R.identity, R.identity, [], testCompFn),
  );
  const result = R.transduce (
    testTransducer,
    R.flip (R.append),
    [],
    testData,
  );
  expect(result).toStrictEqual([[2, 3], [4]]);
});

test('reduceGroup transduce uses transform result', async () => {
  const testData = [1, 2, 3, 2, 1, 0];
  const key = 'testKey';
  const testValueFn = (acc, x) => {
    return R.assoc (key, R.append (x, acc[key]), acc);
  };
  const testCompFn = (acc, x) => {
    if (R.isEmpty (acc[key])) {
      return true;
    }
    return R.lte (R.last (acc[key]), x);
  };
  const testTransducer = P.transforms.reduceGroup (testValueFn, () => ({ [key]: [] }), R.identity, R.identity, { [key]: [] }, testCompFn);
  const result = R.transduce (
    testTransducer,
    P.transforms.transform (
      R.flip (R.append),
      R.reduce ((acc, x) => {
        return R.compose (
          R.concat (acc),
          R.map (R.inc),
          R.path (['testKey']),
        ) (x);
      }, []),
    ),
    [],
    testData,
  );
  expect(result).toStrictEqual([2, 3, 4, 3, 2, 1]);
});
