module.exports = {
  extends: ['expo', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    tabWidth: 2,
    singleQuote: true,
    bracketSameLine: true,
  },
};
