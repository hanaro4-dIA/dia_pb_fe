import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import prettier from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      react,
      prettier,
      "jsx-a11y": jsxA11y,
    },
    settings: {
      react: { version: "18.3" }, // React 버전 감지
    },
    rules: {
      // ...js.configs.recommended.rules, // ESLint rules
      ...react.configs.recommended.rules, // React rules
      ...react.configs["jsx-runtime"].rules, // JSX rules
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "prettier/prettier": "warn",
      "jsx-a11y/alt-text": "error",
    },
  },
  eslintConfigPrettier
);
