import { describe, expect, it } from "vitest";
import { createWalksRepository } from "./walks-repository";

describe("walksRepository.addWalk", () => {
  it("returns the created walk with a generated id", async () => {
    const repository = createWalksRepository();

    const walk = await repository.addWalk({ startedAt: new Date() });

    expect(walk.id).toBeDefined();
  });
});
