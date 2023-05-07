module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
      "services/(.*)": "<rootDir>/src/services/$1",
      "controllers/(.*)": "<rootDir>/src/controllers/$1",
      "middleware/(.*)": "<rootDir>/src/middleware/$1",
      "src/(.*)": "<rootDir>/src/$1"
    },
    transformIgnorePatterns: [
      "<rootDir>/node_modules/*"
    ]
  };