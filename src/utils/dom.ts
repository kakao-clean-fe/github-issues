import type { FindElementArgs, RenderInnerHtmlArgs, SetEventListenerToElementArgs } from '~/types/utils/dom';

export const findElement = ({ fromElement = document, selector }: FindElementArgs): Element | null => {
  return fromElement.querySelector(selector);
};

export const renderInnerHtml = ({ parent, html }: RenderInnerHtmlArgs): void => {
  if (parent != null) {
    parent.innerHTML = html;
  }
};

const setEventListenerToElement = ({ element, event, eventHandler }: SetEventListenerToElementArgs): void => {
  if (element !== null) {
    element.addEventListener(event, eventHandler);
  }
};

const setEventToEventListener = (event: string) => (args: Omit<SetEventListenerToElementArgs, 'event'>) => setEventListenerToElement({ event, ...args });

export const addClickEventListener = setEventToEventListener('click');

export const toggleClass = (element: Element | null, className: string): void => {
  element?.classList.toggle(className);
};

export const removeClass = (element: Element | null, className: string): void => {
  element?.classList.remove(className);
};

export const addClass = (element: Element | null, className: string): void => {
  element?.classList.add(className);
};
