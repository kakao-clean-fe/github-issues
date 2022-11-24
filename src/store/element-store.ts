import { findElement } from '~/utils/dom';
import { pipe } from '~/utils/functional-util';
import type { FindElementArgs } from '~/types/utils/dom';

type Selector = string;

const elementMap = new Map<Selector, Element | null>();

const hasElement = (selector: Selector): boolean => elementMap.has(selector);

const setElement = ({ selector, element }: { selector: Selector, element: Element | null }): void => {
  elementMap.set(selector, element);
};

const findAndSetElement = ({ fromElement, selector }: FindElementArgs): void => {
  pipe(
    findElement,
    (element: Element | null) => setElement({ selector, element })
  )({ selector, fromElement });
};

export const getElement = ({ fromElement, selector }: FindElementArgs): Element | null => {
  if (!hasElement(selector)) {
    findAndSetElement({ fromElement, selector });
  }
  return elementMap.get(selector) ?? null;
};
