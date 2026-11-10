import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  expect: {
    timeout: 15_000,
  },
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 2 : undefined,
  use: {
    baseURL: 'http://localhost:8080',
    trace: 'on-first-retry',
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    // Removed global extraHTTPHeaders so public APIs like ReqRes won't receive the mock token
  
    launchOptions: {
      args: ['--start-maximized'],
    },
  },
  reporter: 'html',
});