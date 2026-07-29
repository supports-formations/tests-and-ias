import { defineConfig } from '@playwright/test';
import path from 'path';

const repoRoot = path.resolve(__dirname, '..', '..');

// Dedicated config for the smoke suite: short global timeout (goal: each test < 5s,
// full suite < 2min), single worker to keep the fixture data deterministic and easy to read.
export default defineConfig({
  testDir: '.',
  timeout: 5_000,
  expect: { timeout: 3_000 },
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
