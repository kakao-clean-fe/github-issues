export const filterArray = <T>({ arr, filterFunc }: { arr: T[], filterFunc: Parameters<typeof Array.prototype.filter>[0] }): T[] => {
  return arr.filter(filterFunc);
};

export const countArray = ({ arr }: { arr: unknown[] }): number => {
  return arr.length;
};

export const reduceArray = <ReturnValue>({ arr, initValue, reducer }: { arr: unknown[], initValue: unknown, reducer: Parameters<typeof Array.prototype.reduce>[0] }): ReturnValue => {
  return arr.reduce(reducer, initValue) as ReturnValue;
};
