module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],

  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.eslint.json",
  },
  plugins: ["@typescript-eslint", "prettier"],
  ignorePatterns: [".eslintrc.js"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        singleQuote: true,
        trailingComma: "all",
        tabWidth: 2,
        semi: false,
        printWidth: 140,
      },
    ],
  },
};
