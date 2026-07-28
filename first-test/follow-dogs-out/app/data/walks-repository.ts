export type NewWalk = {
  startedAt: Date;
};

export type Walk = NewWalk & {
  id: string;
};

export function createWalksRepository() {
  let nextId = 1;
  const walks: Walk[] = [];

  return {
    async addWalk(newWalk: NewWalk): Promise<Walk> {
      if (!newWalk.startedAt) {
        throw new Error("startedAt is required");
      }

      const walk = { id: String(nextId++), ...newWalk };
      walks.push(walk);
      return walk;
    },

    async getWalks(): Promise<Walk[]> {
      return walks;
    },
  };
}
