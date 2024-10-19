export default [
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    files: [
      '*.js',
      '*.vue',
      "src/**/*.js"
    ],
    ignores: ["**/*.config.js"],
    rules: {
      semi: "error",
      "prefer-const": "error"
    },
    env: {
      node: true,
      commonjs: true,
      browser: true,
      es6: true
    },
    globals: {
      process: 'readonly',
    },
    extends: [
      'plugin:vue/vue3-essential',
      'eslint:recommended',
    ],
    parserOptions: {
      ecmaVersion: 'latest',
    },
  }
];
