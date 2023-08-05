import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  globalSetup: "./tests/globalSetup.ts",
  use: {
    ignoreHTTPSErrors: true,
    ...devices["Desktop Chrome"]
  },
  webServer: {
    reuseExistingServer: true,
    port: 3000,
    command: "npm run dev"
  }
});
