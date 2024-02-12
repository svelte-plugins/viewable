import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src',
  testMatch: '**/?(*.)+(spec).[jt]s',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  snapshotPathTemplate: 'tests/snapshots/{arg}/{arg}{ext}',
  expect: {
    toHaveScreenshot: {
      maxDiffPixels: 300
    },
    toMatchSnapshot: {
      maxDiffPixelRatio: 1
    }
  },
  use: {
    trace: 'on-first-retry',
    viewport: {
      width: 1280,
      height: 720
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ],
  webServer: {
    command: 'pnpm start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    stdout: 'ignore',
    stderr: 'pipe',
  },
});
