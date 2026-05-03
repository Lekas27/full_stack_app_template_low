/**
 * @file ESLint configuration file.
 *
 * NOTE: Do not modify on your own, consult with maintainers.
 *
 * Reference: https://eslint.org/docs/latest/use/configure/configuration-files
 */
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import storybook from "eslint-plugin-storybook";
import unicorn from "eslint-plugin-unicorn";
import globals from "globals";
import tseslint from "typescript-eslint";

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

export default tseslint.config(
  /* Global options */
  {
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    ignores: ["dist", "coverage", "storybook-static"],
  },

  /* All TS / TSX files */
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
        project: ["./tsconfig.eslint.json"],
      },
      ecmaVersion: 2020,
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      import: importPlugin,
      unicorn,
    },
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      ...compat.extends(
        "plugin:react/recommended",
        "plugin:import/recommended",
        "plugin:import/typescript" // <— TS‑aware import rules
      ),
    ],
    rules: {
      /* -------- General code‑quality rules -------- */
      "no-console": "error",
      "no-restricted-imports": ["error", { patterns: ["../*"] }],
      "padding-line-between-statements": [
        "error",
        {
          blankLine: "always",
          prev: [
            "block",
            "block-like",
            "cjs-export",
            "class",
            "export",
            "import",
          ],
          next: "*",
        },
        { blankLine: "always", prev: "*", next: ["export"] },
        {
          blankLine: "any",
          prev: ["export", "import"],
          next: ["export", "import"],
        },
      ],
      "func-style": ["error", "expression", { allowArrowFunctions: true }],
      "prefer-arrow-callback": "error",

      /* -------- Import plugin rules -------- */
      "import/no-extraneous-dependencies": "error",
      "import/no-mutable-exports": "error",
      // "import/no-unused-modules": "error", // DISABLED: Very slow on large codebases
      "import/no-default-export": "off", // allowed globally; tightened below for src/
      "import/no-self-import": "error",
      // "import/no-cycle": ["error", { ignoreExternal: true }], // DISABLED: Slow on large codebases
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-unassigned-import": ["error", { allow: ["**/*.css"] }],
      "import/order": [
        "error",
        {
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],

      /* -------- Prevent end-of-file exports -------- */
      "import/prefer-default-export": "off", // We don't want default exports anyway
      "import/exports-last": "off", // We want exports at declaration site, not last

      /* -------- React / Hooks -------- */
      "react/function-component-definition": [
        "error",
        { namedComponents: "arrow-function" },
      ],
      "react/jsx-filename-extension": "off",
      "react/jsx-curly-brace-presence": [
        "error",
        { props: "never", children: "never" },
      ],
      "react/react-in-jsx-scope": "off",
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": "off", // silence fast‑refresh warnings

      /* -------- TypeScript -------- */
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "after-used",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "@typescript-eslint/naming-convention": [
        "error",
        // Variables should be camelCase or PascalCase (for React components) or UPPER_CASE (constants)
        {
          selector: "variable",
          format: ["camelCase", "PascalCase", "UPPER_CASE"],
        },
        // Functions should be camelCase or PascalCase (for React function components)
        {
          selector: "function",
          format: ["camelCase", "PascalCase"],
        },
        // Parameters should be camelCase (allow _ prefix and PascalCase for React components)
        {
          selector: "parameter",
          format: ["camelCase", "PascalCase"],
          leadingUnderscore: "allow",
          filter: {
            // Allow underscore-only parameters for intentionally unused params
            regex: "^_+$",
            match: false,
          },
        },
        // Type and interface names should be PascalCase
        {
          selector: "typeLike",
          format: ["PascalCase"],
        },
      ],

      /* -------- File naming conventions -------- */
      "unicorn/filename-case": [
        "error",
        {
          case: "kebabCase",
        },
      ],
    },
    settings: {
      react: { version: "detect" },
      "import/resolver": {
        typescript: {
          project: ["./tsconfig.json"],
        },
      },
      "import/core-modules": ["@storybook/addon-a11y/preview"],
    },
  },

  /* Production source code (enforce named exports at declaration) */
  {
    files: ["src/**/*.{ts,tsx}"],
    rules: {
      "import/no-default-export": "error",

      /* -------- Prevent end-of-file exports and barrel exports -------- */
      "no-restricted-syntax": [
        "error",
        {
          selector: "ImportNamespaceSpecifier",
          message:
            "Namespace imports are not allowed. Use named imports instead.",
        },
        {
          selector: "ExportNamedDeclaration[declaration=null]",
          message:
            "Export at declaration site: 'export const App = ...' not 'const App = ...; export { App }'",
        },
        {
          selector: "ExportAllDeclaration",
          message:
            "No barrel exports: use explicit named exports instead of 'export *'",
        },
      ],
    },
  },

  /* TypeScript declaration files (allow interfaces for module augmentation) */
  {
    files: ["**/*.d.ts"],
    rules: {
      "@typescript-eslint/consistent-type-definitions": "off",
    },
  },

  /* Test files (relaxed rules for testing patterns) */
  {
    files: ["**/*.{test,spec}.{ts,tsx}", "**/__tests__/**/*.{ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        // Add vitest globals if you're using them globally
        // If you prefer imports, you can omit this section
        describe: "readonly",
        it: "readonly",
        expect: "readonly",
        vi: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
      },
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off", // Allow any type in test files
      "@typescript-eslint/no-magic-numbers": "off", // Test data often uses literals
      "no-magic-numbers": "off", // Test data often uses literals
      "max-lines-per-function": "off", // Test functions can be long
      "max-nested-callbacks": "off", // describe/it nesting is common
      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: true, // Allow dev dependencies in tests
        },
      ],

      /* -------- Keep these strict for quality -------- */
      "prefer-const": "error",
      "no-var": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "after-used",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
    },
  },

  /* CommonJS files */
  {
    files: ["*.cjs"],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      "@typescript-eslint/no-var-requires": "off",
    },
  },

  /* Build / tooling config files */
  {
    files: ["*.config.[jt]s"],
    rules: {
      "import/no-default-export": "off",
      "unicorn/filename-case": "off",
    },
  },

  /* Storybook stories & config */
  {
    files: ["**/*.stories.*", ".storybook/**/*.{ts,tsx}"],
    rules: {
      "import/no-default-export": "off",
    },
  },

  /* Extra Storybook plugin rules */
  storybook.configs["flat/recommended"]
);
