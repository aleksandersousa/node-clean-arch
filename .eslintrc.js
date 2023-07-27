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
