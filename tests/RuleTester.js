const { RuleTester } = require("eslint");
const { resolve } = require("path");

RuleTester.setDefaultConfig({
  parser: resolve(__dirname, "../node_modules/babel-eslint"),
  parserOptions: {
    sourceType: "module"
  }
});

module.exports = RuleTester;
