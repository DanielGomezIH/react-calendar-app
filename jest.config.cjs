module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFiles: [ './jest.setup.js' ],
  transformIgnorePatterns: [],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less)$': '<rootDir>/tests/mocks/styleMock.js',
  },

  extensionsToTreatAsEsm: [ '.ts', '.tsx' ],
};
