import { defineConfig } from '@playwright/test';
import path from 'path';

const repoRoot = path.resolve(__dirname, '..');

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'retain-on-failure',
  },
  webServer: [
    {
      command: 'npm run start:dev --workspace backend',
      cwd: repoRoot,
      url: 'http://localhost:3000/api/journeys',
      reuseExistingServer: !process.env.CI,
      timeout: 60_000,
      // /api/journeys without a token returns 401, which is enough to prove the server is up.
      ignoreHTTPSErrors: true,
    },
    {
      command: 'npm run dev --workspace frontend',
      cwd: repoRoot,
      url: 'http://localhost:5173',
      reuseExistingServer: !process.env.CI,
      timeout: 60_000,
    },
  ],
});
