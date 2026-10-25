import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv'; 

dotenv.config();

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'http://localhost:8080',
    trace: 'on-first-retry',
  },
});