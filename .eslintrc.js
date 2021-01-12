module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-typescript/base',
    'plugin:import/typescript',
  ],
  ignorePatterns: [
    '.eslintrc.js'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    project: './tsconfig.eslint.json',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    '@typescript-eslint/lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    '@typescript-eslint/no-unused-vars': ['error'],
    'class-methods-use-this': 0,
    'import/prefer-default-export': 0,
    'import/no-unresolved': [2, { commonjs: true, amd: true }],
    'max-len': 0,
    'no-unused-vars': 'off',
  },
};
