const R = require('ramda');
const P = require('../../index');

test('Preserving reduced wrap transform', async () => {
  const testTransducer = R.compose (
    R.map (
      P.preservingReduced (
        R.ifElse (
          R.equals (1),
          R.inc,
          R.reduced,
        ),
      ),
    ),
    R.map (
      P.preservingReduced (
        R.when (
          R.equals (2),
          R.inc,
        ),
      ),
    ),
  );
  const testValues = [1, 2, 3, 4, 5];
  const testFn = R.flip (R.append);
  const result = await P.transduce (testTransducer, P.transforms.preservingReducedWrap (testFn), [], testValues);
  expect(result).toStrictEqual([3]);
});
