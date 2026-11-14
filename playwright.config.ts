import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 45000,
  fullyParallel: false,
  reporter: [['list'], ['json', { outputFile: 'documentation/playwright_test_results.json' }]],
  use: {
    baseURL: 'http://localhost:3005',
    channel: 'chrome',
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'Google Chrome Desktop',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
      },
    },
    {
      name: 'Google Chrome Mobile (375x667)',
      use: {
        viewport: { width: 375, height: 667 },
        isMobile: true,
        channel: 'chrome',
      },
    },
  ],
});
