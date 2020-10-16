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

test ('ApplySpec', async () => {
  const obj = {
    time1: 200,
    time2: 1000,
    time3: 500,
    time4: 100,
    foo: 'test1',
    bar: 'test2',
    foobar: 'test3',
  };
  console.time ('test');
  const result = await P.applySpec ({
    a: R.pipe (
      R.prop ('time1'),
      sleepAdd100,
    ),
    b: R.pipe (
      R.prop ('time2'),
      sleepAdd100,
    ),
    c: R.pipe (
      R.prop ('time3'),
      sleepAdd100,
    ),
    d: {
      e: R.pipe (
        R.prop ('time4'),
        sleepAdd100,
      ),
    },
    e: R.prop ('foo'),
    f: R.prop ('bar'),
    g: {
      h: {
        i: R.prop ('foobar'),
      },
    },
  }) (obj);
  console.timeEnd ('test');
  expect (result).toStrictEqual ({
    a: 300,
    b: 1100,
    c: 600,
    d: {
      e: 200,
    },
    e: 'test1',
    f: 'test2',
    g: {
      h: {
        i: 'test3',
      },
    },
  });
});
