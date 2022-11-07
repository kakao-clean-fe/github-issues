import type { FindElementArgs, RenderInnerHtmlArgs, FindParentAndRenderInnerHtmlArgs, AddEventListerArgs } from '~/types/utils/dom';
import { pipe } from '~/utils/functional-util';

export const findElement = ({ fromElement = document, selector }: FindElementArgs): Element | null => {
  console.count(selector);
  return fromElement.querySelector(selector);
};

export const renderInnerHtml = ({ parent, html }: RenderInnerHtmlArgs): void => {
  if (parent != null) {
    parent.innerHTML = html;
  }
};

export const findParentAndRenderInnerHtml = ({ fromElement, selector, html }: FindParentAndRenderInnerHtmlArgs): void => {
  pipe(
    findElement,
    (parent: Element | null) => renderInnerHtml({ parent, html })
  )({ fromElement, selector });
};

const addEventListener = ({ element, event, eventHandler }: AddEventListerArgs): void => {
  if (element !== null) {
    element.addEventListener(event, eventHandler);
  }
};

const setEventToEventListener = (event: string) => (args: Omit<AddEventListerArgs, 'event'>) => addEventListener({ event, ...args });

export const addClickEventListener = setEventToEventListener('click');

export const toggleClass = (element: Element | null, style: string) => {
  element?.classList.toggle(style);
};
