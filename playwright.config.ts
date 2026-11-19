import { defineConfig } from "@playwright/test";

const processLike = globalThis as typeof globalThis & {
  process?: { env?: Record<string, string | undefined> };
};
const environment = processLike.process?.env ?? {};
const executablePath = environment.PLAYWRIGHT_CHROMIUM_EXECUTABLE;

export default defineConfig({
  testDir: "./e2e",
  testMatch: "**/*.spec.ts",
  fullyParallel: false,
  retries: 0,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:4173",
    browserName: "chromium",
    viewport: { width: 1365, height: 900 },
    launchOptions: executablePath ? { executablePath } : {},
  },
  webServer: {
    command: "npm run preview -- --host 127.0.0.1 --port 4173 --strictPort",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: !environment.CI,
    timeout: 30_000,
  },
});
