const { stylelint } = require('@siberiacancode/stylelint');

/** @type {import('stylelint').Config} */
module.exports = {
  ...stylelint,
  rules: {
    ...stylelint.rules,
    'custom-property-pattern': null
  }
};
