const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig');

module.exports = {
  preset: 'ts-jest',
  verbose: true,
  testEnvironment: 'jsdom',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/'
  }),
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        collectCoverage: true,
        coverageDirectory: 'coverage',
        coverageProvider: 'v8'
      }
    ]
  }
};
