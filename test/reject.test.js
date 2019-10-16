const P = require('../index');

test('Reject on even numbers', async () => {
  const testValues = [1, 2, 3, 4, 5];

  const result = await P.reject ((v) => (v % 2 === 0), testValues);
  expect(result).toStrictEqual([1, 3, 5]);
});
