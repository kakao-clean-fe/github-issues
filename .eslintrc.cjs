module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'standard-with-typescript',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    semi: ['error', 'always'],
    'comma-dangle': ['error', {
      arrays: 'never',
      objects: 'always',
      imports: 'never',
      exports: 'never',
      functions: 'never',
    }],
    'no-useless-escape': ['warn'],
  },
};
