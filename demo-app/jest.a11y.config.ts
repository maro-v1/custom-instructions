import type { Config } from 'jest';

const config: Config = {
  preset: 'jest-preset-angular',
  testEnvironment: 'jsdom',
  setupFilesAfterSetup: ['<rootDir>/setup-jest.ts'],
  testMatch: ['**/*.a11y.test.ts'],
  coverageProvider: 'v8',
  coverageDirectory: 'coverage/a11y',
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
};

export default config;
