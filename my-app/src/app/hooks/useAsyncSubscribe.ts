const useAsyncSubscribe = <T, Y>(
  list: T[],
  refetch: () => void,
  add: (target: Y) => void,
  remove: (target: T) => void,
  update: (ev: string, target?: T) => Promise<boolean>
) => {
  return {
    addObserver: async (target: Y) => {
      await add(target);
      refetch();
    },
    removeObserver: async (target: T) => {
      await remove(target);
      refetch();
    },
    notifyObservers: (e: { ev: string; target?: T }) => {
      list.map(async (item) => {
        const isWorked = await update.call(item, e.ev, e.target);
        isWorked && refetch();
        return item;
      });
    },
  };
};

export default useAsyncSubscribe;
