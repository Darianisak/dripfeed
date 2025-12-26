/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
  testEnvironment: "jsdom",

  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // If the file path matches any of the patterns, coverage information will be skipped.
  coveragePathIgnorePatterns: [
    ".*\/__tests__\/factory\..*\.js",
    ".*\/node_modules",
  ],

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",

  // The glob patterns Jest uses to detect test files.
  testMatch: ["**/__tests__/**.test.js"],
};

module.exports = config;
