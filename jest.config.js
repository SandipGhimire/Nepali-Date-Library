import { createDefaultPreset } from "ts-jest";
const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
export default {
  projects: [
    {
      displayName: "node",
      testEnvironment: "node",
      testMatch: ["**/test/**/*.test.ts"],
      transform: {
        ...tsJestTransformCfg,
      },
    },
    {
      displayName: "browser",
      testEnvironment: "jsdom",
      testMatch: ["**/test/**/*.test.ts"],
      transform: {
        ...tsJestTransformCfg,
      },
    },
  ],
};
