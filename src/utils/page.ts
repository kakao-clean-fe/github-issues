import { reduceArray } from './array';
import { removeClass } from '~/utils/dom';
import { pipe } from '~/utils/functional-util';
import { getElement } from '~/store/element-store';

export const makeTemplate = <Item>({ arr, templateFunc }: { arr: Item[], templateFunc: (item: Item) => string }): string => {
  return reduceArray({
    arr,
    initValue: '',
    reducer: (template: string, item: Item) => `${template}${templateFunc(item)}`
  });
};

const DISPLAY_NONE_CLASS_NAME = 'hidden';
const setDisplayBlock = (element: Element | null): void => removeClass(element, DISPLAY_NONE_CLASS_NAME);
export const displayBlockBySelector = pipe(getElement, setDisplayBlock);
