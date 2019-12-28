const { RuleTester } = require("eslint");

RuleTester.setDefaultConfig({
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module"
  }
});

module.exports = RuleTester;
