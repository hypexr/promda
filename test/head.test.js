const P = require('../index');

test('Head from empty sync iterator', async () => {
  const testIter = [].values();
  const result = await P.head (testIter);
  expect(result).toStrictEqual(undefined);
});

test('Head from small sync iterator', async () => {
  const testIter = [1].values();
  const result = await P.head (testIter);
  expect(result).toStrictEqual(1);
});

test('Head from sync iterator', async () => {
  const testIter = [1, 2].values();
  const result = await P.head (testIter);
  expect(result).toStrictEqual(1);
});

test('Head from empty async iterator', async () => {
  /* eslint-disable no-empty-function */
  async function* testGenerator() {
  }
  /* eslint-enable no-empty-function */
  const testIter = await testGenerator();
  const result = await P.head (testIter);
  expect(result).toStrictEqual(undefined);
});

test('Head from small async iterator', async () => {
  async function* testGenerator() {
    yield 1;
  }
  const testIter = await testGenerator();
  const result = await P.head (testIter);
  expect(result).toStrictEqual(1);
});

test('Head from async iterator', async () => {
  async function* testGenerator() {
    yield 1;
    yield 2;
  }
  const testIter = await testGenerator();
  const result = await P.head (testIter);
  expect(result).toStrictEqual(1);
});
