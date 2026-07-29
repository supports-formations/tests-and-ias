import { describe, expect, it } from "vitest";
import { generateMockWalk } from "./walks-mock-generator";
import { walkNotesFixtures } from "./walk-notes-fixtures";

describe("generateMockWalk", () => {
  it("returns a walk with startedAt within the last 30 days", () => {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const walk = generateMockWalk();

    expect(walk.startedAt.getTime()).toBeGreaterThanOrEqual(
      thirtyDaysAgo.getTime(),
    );
    expect(walk.startedAt.getTime()).toBeLessThanOrEqual(now.getTime());
  });

  it("returns a walk with a note picked from the fixtures", () => {
    const walk = generateMockWalk();

    expect(walkNotesFixtures).toContain(walk.note);
  });
});
