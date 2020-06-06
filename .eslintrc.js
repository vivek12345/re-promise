module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      arrowFunctions: true,
      module: true
    }
  },
  env: {
    browser: true,
    node: true,
    jest: true,
    es6: true
  },
  extends: ['eslint:recommended'],
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-console': ['off']
  }
};
