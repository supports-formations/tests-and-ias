import { describe, expect, it } from "vitest";
import { createWalksRepository } from "./walks-repository";

describe("walksRepository.addWalk", () => {
  it("returns the created walk with a generated id", async () => {
    const repository = createWalksRepository();

    const walk = await repository.addWalk({ startedAt: new Date() });

    expect(walk.id).toBeDefined();
  });

  it("generates different ids for two different walks", async () => {
    const repository = createWalksRepository();

    const firstWalk = await repository.addWalk({ startedAt: new Date() });
    const secondWalk = await repository.addWalk({ startedAt: new Date() });

    expect(firstWalk.id).not.toBe(secondWalk.id);
  });
});

describe("walksRepository.getWalks", () => {
  it("includes a walk previously added with addWalk", async () => {
    const repository = createWalksRepository();
    const addedWalk = await repository.addWalk({ startedAt: new Date() });

    const walks = await repository.getWalks();

    expect(walks).toContainEqual(addedWalk);
  });
});

describe("walksRepository.addWalk validation", () => {
  it("rejects a walk without startedAt", async () => {
    const repository = createWalksRepository();

    await expect(
      repository.addWalk({ startedAt: undefined as unknown as Date }),
    ).rejects.toThrow();
  });
});
