export const filterArray = <T>({ arr, filterFunc }: { arr: T[], filterFunc: Parameters<typeof Array.prototype.filter>[0] }): T[] => {
  return arr.filter(filterFunc);
};

export const countArray = ({ arr }: { arr: unknown[] }): number => {
  return arr.length;
};
