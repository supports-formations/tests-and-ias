export type NewWalk = {
  startedAt: Date;
};

export type Walk = NewWalk & {
  id: string;
};

export function createWalksRepository() {
  let nextId = 1;

  return {
    async addWalk(newWalk: NewWalk): Promise<Walk> {
      return { id: String(nextId++), ...newWalk };
    },
  };
}
