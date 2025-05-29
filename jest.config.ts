// jest.config.ts
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Ajusta si usas aliases
  },
  testPathIgnorePatterns: ['<rootDir>/__tests__/__mock__/.*']


}

module.exports = createJestConfig(customJestConfig)
