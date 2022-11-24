module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true
  },
  extends: 'standard-with-typescript',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [{
    files: ['*.ts', '*.tsx'],
    extends: [
      'plugin:@typescript-eslint/recommended',
      'plugin:@typescript-eslint/recommended-requiring-type-checking'
    ],
    parserOptions: {
      project: ['./tsconfig.json'], // Specify it only for TypeScript files
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    rules: {
      '@typescript-eslint/semi': ['error', 'always'],
      '@typescript-eslint/explicit-function-return-type': ['warn'],
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-return': 'warn',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
      '@typescript-eslint/no-unsafe-call': 'warn',
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/no-unused-vars': 'error'
    }
  }],
  rules: {
    semi: ['error', 'always'],
    'no-useless-escape': 'warn'
  }
};
