import { findElement } from '~/utils/dom';
import { pipe } from '~/utils/functional-util';

type Selector = string;

const elementMap = new Map<Selector, Element | null>();

const hasElement = (selector: Selector): boolean => elementMap.has(selector);

const setElement = ({ selector, element }: { selector: Selector, element: Element | null }): void => {
  elementMap.set(selector, element);
};

const findAndSetElement = (selector: Selector): void => {
  pipe(
    findElement,
    (element: Element | null) => setElement({ selector, element })
  )({ selector });
};

export const getElement = (selector: Selector): Element | null => {
  if (!hasElement(selector)) {
    findAndSetElement(selector);
  }
  return elementMap.get(selector) ?? null;
};
