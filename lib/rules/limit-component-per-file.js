/**
 * @fileoverview Limit the number of classes or functions allowed in files where React is used
 */
"use strict";

const defaults = {
  packageName: "react",
  limit: 1,
  ignoreExported: false
};

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description:
        "Limit the number of classes or functions allowed in files where React is used",
      category: "react",
      recommended: false
    },
    fixable: null, // or "code" or "whitespace"
    schema: [
      {
        type: "object",
        properties: {
          packageName: {
            type: "string",
            description:
              "The package name that, when detected, this rule applies to",
            default: "react"
          },
          limit: {
            type: "number",
            description:
              "The max number of methods / classes allowed per file where packageName is used",
            default: 1
          },
          ignoreExported: {
            type: "boolean",
            description:
              "Whether exported methods are considered for the file limit (false) or not (true)",
            default: false
          }
        },
        additionalProperties: false
      }
    ]
  },

  create: function(context) {
    const options = { ...defaults, ...context.options[0] };

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------
    let methodOrClassCount = 0;
    let hasReact = false;

    function validate(node) {
      if (
        !options.ignoreExported ||
        !["ExportNamedDeclaration", "ExportDefaultDeclaration"].includes(
          node.parent.type
        )
      ) {
        methodOrClassCount += 1;
      }

      if (hasReact && methodOrClassCount > options.limit) {
        context.report({
          node,
          message: `Only ${options.limit} methods or classes allowed in ${options.packageName} files, ${methodOrClassCount} found`
        });
      }
    }

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      ImportDeclaration(node) {
        if (node.source.value === options.packageName) {
          hasReact = true;
        }
      },
      VariableDeclaration(node) {
        const requiresReact = ({ init }) =>
          init.type === "CallExpression" &&
          init.callee.name === "require" &&
          init.arguments[0].value === options.packageName;
        if (node.declarations.some(requiresReact)) {
          hasReact = true;
        }
      },
      FunctionDeclaration(node) {
        return validate(node);
      },
      FunctionExpression(node) {
        return validate(node);
      },
      ArrowFunctionExpression(node) {
        return validate(node);
      },
      ClassDeclaration(node) {
        return validate(node);
      }
    };
  }
};
