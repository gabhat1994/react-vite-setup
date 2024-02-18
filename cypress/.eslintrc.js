module.exports = {
  extends: ['../.eslintrc.js'],
  parserOptions: {
    project: './cypress/tsconfig.json',
  },
  rules: {
    'no-plusplus': 'off',
    'no-console': 'off',
    'class-methods-use-this': 'off',
    'import/prefer-default-export': 'off',
  },
  ignorePatterns: ['**/*.template.tsx'],
};
