import globals from "globals";
import pluginJs from "@eslint/js";
import eslintPluginNode from "eslint-plugin-node"; 
import eslintPluginPrettier from "eslint-plugin-prettier"; 

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.js"],
    languageOptions: { sourceType: "commonjs" },
    env: {
      node: true, 
      es2021: true
    },
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: "commonjs"
    },
    plugins: {
      node: eslintPluginNode,
      prettier: eslintPluginPrettier
    },
    extends: [
      "eslint:recommended",
      "plugin:node/recommended",
      "plugin:prettier/recommended"
    ],
    rules: {
      "no-console": "off",
      "no-unused-vars": "warn",
      "prettier/prettier": "error"
    }
  },
  {
    languageOptions: { globals: globals.node }
  },
  pluginJs.configs.recommended
];
