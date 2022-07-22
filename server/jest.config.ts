import type { Config } from "@jest/types";

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "node",
  globalSetup: "<rootDir>/tests/setup.ts",
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
};
export default config;
