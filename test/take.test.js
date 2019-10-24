const P = require('../index');

test('Take from empty sync iterator', async () => {
  const testIter = [].values();
  const result = await P.take (10, testIter);
  expect(result).toStrictEqual([]);
});

test('Take 0 items from sync iterator', async () => {
  const testIter = [1].values();
  const result = await P.take (0, testIter);
  expect(result).toStrictEqual([]);
});

test('Take 1 item from sync iterator', async () => {
  const testIter = [1].values();
  const result = await P.take (1, testIter);
  expect(result).toStrictEqual([1]);
});

test('Take 2 items from small sync iterator', async () => {
  const testIter = [1].values();
  const result = await P.take (2, testIter);
  expect(result).toStrictEqual([1]);
});

test('Take 2 items from sync iterator', async () => {
  const testIter = [1, 2, 3].values();
  const result = await P.take (2, testIter);
  expect(result).toStrictEqual([1, 2]);
});

test('Take from empty async iterator', async () => {
  /* eslint-disable no-empty-function */
  async function* testGenerator() {
  }
  /* eslint-enable no-empty-function */
  const testIter = await testGenerator();
  const result = await P.take (10, testIter);
  expect(result).toStrictEqual([]);
});

test('Take 0 items from sync iterator', async () => {
  async function* testGenerator() {
    yield 1;
  }
  const testIter = await testGenerator();
  const result = await P.take (0, testIter);
  expect(result).toStrictEqual([]);
});

test('Take 1 item from sync iterator', async () => {
  async function* testGenerator() {
    yield 1;
  }
  const testIter = await testGenerator();
  const result = await P.take (1, testIter);
  expect(result).toStrictEqual([1]);
});

test('Take 2 items from small sync iterator', async () => {
  async function* testGenerator() {
    yield 1;
  }
  const testIter = await testGenerator();
  const result = await P.take (2, testIter);
  expect(result).toStrictEqual([1]);
});

test('Take 2 items from sync iterator', async () => {
  async function* testGenerator() {
    yield 1;
    yield 2;
    yield 3;
  }
  const testIter = await testGenerator();
  const result = await P.take (2, testIter);
  expect(result).toStrictEqual([1, 2]);
});
