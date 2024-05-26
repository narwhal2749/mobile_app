// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  plugins: ["react", "react-native"],
  extends: 'expo',
  parserOptions: {
    "ecmaFeatures": {
      "jsx": true
    }
  },
  env: {
    "react-native/react-native": true
  },
  rules: {
    "react-native/no-unused-styles": 2,
    "react-native/split-platform-components": 2,
    "react-native/no-inline-styles": 2,
    "react-native/no-raw-text": 2,
    "react-native/no-single-element-style-arrays": 2
  }
};
