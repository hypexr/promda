const R = require('ramda');

const tryCatch = R.curry (async (tryer, catcher, input) => {
  try {
    return await tryer (input);
  } catch (error) {
    return catcher (error);
  }
});

module.exports = {
  tryCatch,
};
