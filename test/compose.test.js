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

test('Compose non promises, non map', async () => {
  const value = 2000;
  const result = await P.compose([
    R.inc,
    R.inc,
  ])(value);
  expect(result).toBe(2002);
});

test('Compose non promises, map', async () => {
  const a = [2000, 2100, 2200];
  const result = await P.compose([
    R.map(R.add(2000)),
    R.map(R.add(1000)),
  ])(a);
  expect(result).toContain(5000);
  expect(result).toContain(5100);
  expect(result).toContain(5200);
});

test('Compose promises, non map', async () => {
  const inc = (async v => R.inc(v));

  const value = 500;
  const result = await P.compose([
    inc,
    inc,
  ])(value);
  expect(result).toBe(502);
});

test('Compose promises, non map, delayed', async () => {
  const value = 500;
  const result = await P.compose([
    sleepAdd100,
    sleepAdd100,
  ])(value);
  expect(result).toBe(700);
});

test('Compose promises, map, delayed', async () => {
  const times = [500, 600, 700];
  const result = await P.compose([
    P.promiseAll,
    R.map(sleepAdd100),
    P.promiseAll,
    R.map(sleepAdd100),
  ])(times);
  expect(result).toContain(700);
  expect(result).toContain(800);
  expect(result).toContain(900);
});

test('Compose promises, map, delayed, without final promiseAll', async () => {
  const times = [500, 600, 700];
  const result = await P.compose([
    R.map(sleepAdd100),
    P.promiseAll,
    R.map(sleepAdd100),
  ])(times);
  expect(result).toBeInstanceOf(Array);
  const resultArrayResolved = await P.promiseAll(result);
  expect(resultArrayResolved).toContain(700);
  expect(resultArrayResolved).toContain(800);
  expect(resultArrayResolved).toContain(900);
});

test('Compose promises, maps, non promises', async () => {
  const times = [500, 600, 700];
  const result = await P.compose([
    P.promiseAll,
    R.map(sleepAdd100),
    R.map(R.add(10)),
    P.promiseAll,
    R.map(sleepAdd100),
  ])(times);
  expect(result).toContain(710);
  expect(result).toContain(810);
  expect(result).toContain(910);
});

test('Compose promises, maps, non maps, non promises into single value', async () => {
  const times = [500, 600, 700];
  const result = await P.compose([
    R.sum,
    P.promiseAll,
    R.map(sleepAdd100),
    R.map(R.add(10)),
    P.promiseAll,
    R.map(sleepAdd100),
  ])(times);
  const expectedSum = 710 + 810 + 910;
  expect(result).toBe(expectedSum);
});
