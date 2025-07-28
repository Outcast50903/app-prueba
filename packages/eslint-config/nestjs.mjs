import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: [
      "**/__generated__/**/*.*",
      "**/generated/**/*.*",
      "**/myscript/**/*.*",
      "**/node_modules/**/*.*",
      "**/dist/**/*.*",
      "**/build/**/*.*",
      "**/coverage/**/*.*",
      "**/scripts/**/*.*",
    ],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: { globals: globals.node },
  },
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      complexity: ["error"],
      "max-depth": ["error"],
      "padding-line-between-statements": "off",
      "max-nested-callbacks": ["error"],
      "@typescript-eslint/return-await": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "no-debugger": ["error"],
      "@typescript-eslint/no-non-null-assertion": "error",
      "react/jsx-filename-extension": "off",
      "react/prop-types": "off",
      "typescript-eslint/no-explicit-any": "off",
      "no-return-await": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "max-params": ["error", 5],
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/unbound-method": "warn",
      "@typescript-eslint/no-unsafe-assignment": "warn",
      "@typescript-eslint/no-unsafe-member-access": "warn",
      "@typescript-eslint/no-unsafe-argument": "warn",
      "@typescript-eslint/no-unsafe-call": "warn",
      "@typescript-eslint/no-redundant-type-constituents": "warn",
      "@typescript-eslint/no-unsafe-return": "warn",
    },
  },
  {
    settings: {
      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"],
      },
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "./",
        },
      },
    },
  },
]);
