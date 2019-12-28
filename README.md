# eslint-plugin-frontend

ESLint rules for React frontends

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-frontend`:

```
$ npm install eslint-plugin-frontend --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-frontend` globally.

## Usage

Add `frontend` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["frontend"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "frontend/limit-component-per-file": 2
  }
}
```

## Supported Rules

- [frontend/limit-component-per-file](./docs/rules/limit-component-per-file.md)
