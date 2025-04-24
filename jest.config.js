module.exports = {
    // Your existing configuration
    moduleNameMapper: {
      "^@/(.*)$": "<rootDir>/src/$1"
    },
    transform: {
      "^.+\\.(js|jsx)$": "babel-jest",
      // Add this to handle non-JS modules if needed
      "\\.(css|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub"
    },
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"]
  };