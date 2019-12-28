/**
 * @fileoverview When React is used, only allow one class or function in the file
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/limit-component-per-file");
const RuleTester = require("../../RuleTester");

function errorMessage(expectedCount, foundCount, library = "react") {
  return [
    {
      message: `Only ${expectedCount} methods or classes allowed in ${library} files, ${foundCount} found`
    }
  ];
}

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run("one-component-per-file", rule, {
  valid: [
    {
      // Using another library (without modifying options)
      code: `
      import React from 'preact'
    
      const toLowerCase = (str = '') => str.toLowerCase()
    
      export function LowerCase({ children }) {
        return <>{toLowerCase(children)}</>
      }
`
    },
    {
      // only one export
      code: `
  import React from 'react'

  export function LowerCase({ children = ''}) {
    return <>{children.toLowerCase()}</>
  }
`
    },
    // 2 exports and 2 allowed
    {
      options: [{ limit: 2 }],
      code: `
      import React from 'react'
    
      const toLowerCase = (str = '') => str.toLowerCase()
    
      export function LowerCase({ children }) {
        return <>{toLowerCase(children)}</>
      }
`
    }
  ],

  invalid: [
    {
      // Using another library (modifying options)
      options: [{ packageName: "preact" }],
      code: `
      import React from 'preact'
    
      const toLowerCase = (str = '') => str.toLowerCase()
    
      export function LowerCase({ children }) {
        return <>{toLowerCase(children)}</>
      }
`,
      errors: errorMessage(1, 2, "preact")
    },
    {
      // 2 Method definitions (only 1 allowed)
      code: `
  import React from 'react'

  const toLowerCase = (str = '') => str.toLowerCase()

  export function LowerCase({ children }) {
    return <>{toLowerCase(children)}</>
  }
`,
      errors: errorMessage(1, 2)
    }
  ]
});
