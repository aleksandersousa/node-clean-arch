module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  plugins: ['unused-imports', 'prettier', 'import', '@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  overrides: [
    {
      files: ['*.ts', '*.tsx'], // Your TypeScript files extension
      extends: ['standard-with-typescript', 'prettier'],

      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json'],
      },
    },
  ],
  rules: {
    'prettier/prettier': 'error',
  },
};
