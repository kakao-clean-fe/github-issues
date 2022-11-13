import { reduceArray } from './array';

export const makeTemplate = <Item>({ arr, templateFunc }: { arr: Item[], templateFunc: (item: Item) => string }): string => {
  return reduceArray({
    arr,
    initValue: '',
    reducer: (template: string, item: Item) => `${template}${templateFunc(item)}`
  });
};
