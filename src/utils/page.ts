import { reduceArray } from './array';
import { removeClass, addClass } from '~/utils/dom';

export const makeTemplate = <Item>({ arr, templateFunc }: { arr: Item[], templateFunc: (item: Item) => string }): string => {
  return reduceArray({
    arr,
    initValue: '',
    reducer: (template: string, item: Item) => `${template}${templateFunc(item)}`
  });
};

const DISPLAY_NONE_CLASS_NAME = 'hidden';
export const addElementToDOM = (element: Element | null): void => removeClass(element, DISPLAY_NONE_CLASS_NAME);
export const removeElementFromDOM = (element: Element | null): void => addClass(element, DISPLAY_NONE_CLASS_NAME);
