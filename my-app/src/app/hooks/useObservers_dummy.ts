import { useState } from "react";

const useObservers = <T>(
  list: T[],
  update: (ev: string, target?: T) => void
) => {
  const [observers, setObservers] = useState(list);
  return {
    addObserver: (target: T) =>
      setObservers(() => {
        observers.push(target);
        return observers;
      }),
    removeObserver: (target: T) => {
      setObservers(
        observers.filter((item) => {
          return item !== target;
        })
      );
    },
    notifyObservers: (e: { ev: string; target?: T }) => {
      setObservers(
        observers.map((item) => {
          update.call(item, e.ev, e.target);
          return item;
        })
      );
    },
    getList: observers,
  };
};

export default useObservers;
