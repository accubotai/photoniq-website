import globals from "globals";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser
      }
    },
    rules: {
      "complexity": ["error", 10],
      "no-unused-vars": "error",
      "no-undef": "error"
    }
  }
];
