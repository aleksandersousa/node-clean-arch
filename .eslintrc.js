module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  plugins: ['unused-imports', 'prettier', 'import', '@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  overrides: [
    {
      files: ['*.ts'],
      extends: ['standard-with-typescript', 'prettier'],

      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json'],
      },

      rules: {
        '@typescript-eslint/strict-boolean-expressions': 'off',
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/no-misused-promises': 'off',
        'array-callback-return': 'off',
        'unused-imports/no-unused-imports-ts': 'error',
        'prettier/prettier': [
          'error',
          {
            trailingComma: 'all',
            arrowParens: 'avoid',
            singleQuote: true,
            printWidth: 120
          }
        ],
      },
    },
  ],
};
