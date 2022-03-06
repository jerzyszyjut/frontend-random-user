module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'prefer-default-export': 'off',
    'no-restricted-syntax': 'off',
    'guard-for-in': 'off',
    'import/extensions': 'off',
    'prefer-destructuring': 'off',
  },
};
