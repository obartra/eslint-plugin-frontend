# Limit the number of classes or functions allowed in files where React is used (limit-component-per-file)

When React is used, limit the number of classes or functions allowed in the file.

This rule, combined with limiting the [number of statements](https://eslint.org/docs/rules/max-statements), [cyclomatic complexity](https://eslint.org/docs/rules/complexity) or [nested functions](https://eslint.org/docs/rules/no-inner-declarations), helps move React-agnostic logic to dedicated files.

Note that if React Components don't limit the complexity allowed in any way this rule can be easily bypassed by nesting code within the React Component; making things harder to test in isolation.

## Rule Details

The goal is to decouple non-react logic from React Components and move it to a separate file where it would be easily unit-testable. It also allows enforcing one react component per file (since you can limit functions / classes to 1).

Additionally, there's the option to not count exported methods towards that limit since exported methods would already be testable as well.

Examples of **incorrect** code for this rule:

```js
function someComplexLogic(a, b) {
  // ...
}

export function MyComponent({ propA, propB }) {
  const result = someComplexLogic(propA, propB);
  return <>{result}</>;
}
```

Examples of **correct** code for this rule:

```js
import someComplexLogic from "./myComponent.logic";

export function MyComponent({ propA, propB }) {
  const result = someComplexLogic(propA, propB);
  return <>{result}</>;
}
```

### Options

This rule has an object option:

- `"packageName"` (default `"react"`) The package name that, when detected, this rule applies to
- `"limit"` (default `1`) The max number of methods / classes allowed per file where packageName is used
- `"ignoreExported"` (default `false`) Whether exported methods are considered for the file limit (false) or not (true)

## When Not To Use It

If you don't care about limiting the number of functions or classes used in React files.

## Further Reading

- [no-multi-comp](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-multi-comp.md)
- [React Components best practices](https://www.codementor.io/@faizanhaider/react-components-best-practices-9xcbq5uwe)
- [Extracting logic from React Components](https://javascriptplayground.com/react-extracting-logic/)
