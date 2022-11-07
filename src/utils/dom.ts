import type { FindElementArgs, RenderInnerHtmlArgs, AddEventListerArgs } from '~/types/utils/dom';

export const findElement = ({ fromElement = document, selector }: FindElementArgs): Element | null => {
  console.count(selector);
  return fromElement.querySelector(selector);
};

export const renderInnerHtml = ({ parent, html }: RenderInnerHtmlArgs): void => {
  if (parent != null) {
    parent.innerHTML = html;
  }
};

const addEventListener = ({ element, event, eventHandler }: AddEventListerArgs): void => {
  if (element !== null) {
    element.addEventListener(event, eventHandler);
  }
};

const setEventToEventListener = (event: string) => (args: Omit<AddEventListerArgs, 'event'>) => addEventListener({ event, ...args });

export const addClickEventListener = setEventToEventListener('click');

export const toggleClass = (element: Element | null, style: string): void => {
  element?.classList.toggle(style);
};
