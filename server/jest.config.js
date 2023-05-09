module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
      "^src/(.*)": "<rootDir>/src/$1"
    },
    transformIgnorePatterns: [
      "<rootDir>/node_modules/*"
    ],
    moduleDirectories: ['node_modules', 'src']
  };