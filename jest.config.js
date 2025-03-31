module.exports = {
    preset: "react-native",
    setupFilesAfterEnv: [
      "@testing-library/jest-native/extend-expect"
    ],
    setupFiles: [
      "./jest.setup.js"
    ],
    transformIgnorePatterns: [
        "node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|@react-native-community|expo(nent)?|@expo(nent)?/.*|@expo-vector-icons|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)"
    ],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
        // Map '@/' to the root directory
        "^@/(.*)$": "<rootDir>/$1"
        // If your '@/' alias points to a 'src' directory, use this instead:
        // "^@/(.*)$": "<rootDir>/src/$1"
      },
    testEnvironment: "jsdom"
  };