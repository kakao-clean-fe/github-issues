interface FilterArrayArgs<Item> {
  arr: Item[]
  filterFunc: Parameters<typeof Array.prototype.filter>[0]
}
export const filterArray = <Item>({ arr, filterFunc }: FilterArrayArgs<Item>): Item[] => {
  return arr.filter(filterFunc);
};

export const countArray = ({ arr }: { arr: unknown[] }): number => arr.length;

interface ReduceArrayArgs {
  arr: unknown[]
  initValue: unknown
  reducer: Parameters<typeof Array.prototype.reduce>[0]
}
export const reduceArray = <ReturnValue>({ arr, initValue, reducer }: ReduceArrayArgs): ReturnValue => {
  return arr.reduce(reducer, initValue) as ReturnValue;
};
