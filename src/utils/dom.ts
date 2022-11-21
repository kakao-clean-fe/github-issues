import type { FindElementArgs, RenderInnerHtmlArgs, SetEventListenerToElementArgs } from '~/types/utils/dom';

export const findElement = ({ fromElement, selector }: FindElementArgs): Element | null => {
  return (fromElement ?? document).querySelector(selector) ?? null;
};

export const renderInnerHtml = ({ parent, html }: RenderInnerHtmlArgs): void => {
  if (parent != null) {
    parent.innerHTML = html;
  }
};

export const setEventListenerToElement = ({ element, event, eventHandler }: SetEventListenerToElementArgs): void => {
  if (element !== null) {
    element.addEventListener(event, eventHandler);
  }
};

export const clearEventListenerToElement = ({ element, event, eventHandler }: SetEventListenerToElementArgs): void => {
  if (element === null) {
    return;
  }
  element.removeEventListener(event, eventHandler);
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

export const enableButton = (element: HTMLButtonElement | null): void => {
  if (element === null) {
    return;
  }
  element.disabled = false;
};

export const disableButton = (element: HTMLButtonElement | null): void => {
  if (element === null) {
    return;
  }
  element.disabled = true;
};
