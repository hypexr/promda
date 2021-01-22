const R = require('ramda');
const P = require('../index');

test ('tryCatch', async () => {
  const throws = async (msg) => {
    throw msg;
  };

  const result = await P.tryCatch (throws, R.identity) ('anError');
  expect (result).toStrictEqual ('anError');
});
