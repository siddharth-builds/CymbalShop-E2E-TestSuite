import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'http://localhost:8080',
    trace: 'on-first-retry',
    // Removed global extraHTTPHeaders so public APIs like ReqRes won't receive the mock token
  },
  reporter: 'html',
});