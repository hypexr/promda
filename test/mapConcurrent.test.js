const R = require('ramda');
const P = require('../index');

const sleepAdd100 = R.curry(async (time) => {
  console.log('time', time);
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        console.log('sleepAdd100 timeout complete:', time);
        resolve(R.add(100, time));
      }, time);
    } catch (error) {
      reject(error);
    }
  });
});

test('Map concurrent curried', async () => {
  const times = [500, 600, 700];
  const result = await P.mapConcurrent(sleepAdd100)(times);
  expect(result).toContain(600);
  expect(result).toContain(700);
  expect(result).toContain(800);
});

test('Map concurrent not curried', async () => {
  const times = [500, 600, 700];
  const result = await P.mapConcurrent(sleepAdd100, times);
  expect(result).toContain(600);
  expect(result).toContain(700);
  expect(result).toContain(800);
});

test('Compose promises, map, delayed', async () => {
  const times = [500, 600, 700];
  const result = await P.compose([
    P.mapConcurrent(sleepAdd100),
  ])(times);
  expect(result).toContain(600);
  expect(result).toContain(700);
  expect(result).toContain(800);
});

test('Compose promises, maps, non maps, non promises into single value', async () => {
  const times = [500, 600, 700];
  const result = await P.compose([
    R.sum,
    P.mapConcurrent(sleepAdd100),
    R.map(R.add(10)),
    P.mapConcurrent(sleepAdd100),
  ])(times);
  const expectedSum = 710 + 810 + 910;
  expect(result).toBe(expectedSum);
});

test('Compose promises, maps, non promises', async () => {
  const times = [500, 600, 700];
  const result = await P.compose([
    P.mapConcurrent(sleepAdd100),
    R.map(R.add(10)),
    P.mapConcurrent(sleepAdd100),
  ])(times);
  expect(result).toContain(710);
  expect(result).toContain(810);
  expect(result).toContain(910);
});
