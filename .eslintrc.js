module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'react/jsx-props-no-spreading': ['error', {allowAsProps: true}],
    'react-native/no-inline-styles': 0,
  },
};
