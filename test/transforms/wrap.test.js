const R = require('ramda');
const P = require('../../index');

test('Wrap transform', async () => {
  const testTransducer = R.map (R.inc);
  const testValues = [1, 2, 3, 4, 5];
  const testFn = R.flip (R.append);
  const result = await P.transduce (testTransducer, P.transforms.wrap (testFn), [], testValues);
  expect(result).toStrictEqual([2, 3, 4, 5, 6]);
});
