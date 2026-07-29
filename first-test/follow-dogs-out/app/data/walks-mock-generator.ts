import type { NewWalk } from "./walks-repository";
import { walkNotesFixtures } from "./walk-notes-fixtures";

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

export function generateMockWalk(overrides: Partial<NewWalk> = {}): NewWalk {
  const now = Date.now();
  const startedAt = new Date(now - Math.random() * THIRTY_DAYS_MS);
  const note =
    walkNotesFixtures[Math.floor(Math.random() * walkNotesFixtures.length)];

  return { startedAt, note, ...overrides };
}
