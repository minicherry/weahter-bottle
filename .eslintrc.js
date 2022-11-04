module.exports = {
  env: {
    node: true,
    browser: true
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module"
  },
  rules: {
    'no-var': 'error',
    'no-console': 'error'
  }
}