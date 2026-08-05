import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/browser",
  workers: 1,
  // Leave headroom for the first load on a cold Windows/CI worker.
  timeout: 120_000,
  expect: { timeout: 60_000 },
  use: {
    baseURL: "http://127.0.0.1:3100",
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "desktop-chromium",
      use: { ...devices["Desktop Chrome"], browserName: "chromium" },
    },
    {
      name: "mobile-chromium",
      use: { ...devices["iPhone 13"], browserName: "chromium" },
    },
  ],
  webServer: {
    command:
      "npx next build && npx next start --hostname 127.0.0.1 --port 3100",
    url: "http://127.0.0.1:3100",
    env: {
      ...process.env,
      FORM_E2E: "true",
      NEXT_PUBLIC_FORM_E2E_DISABLE_BOTID: "true",
    },
    reuseExistingServer: true,
    timeout: 300_000,
  },
});
