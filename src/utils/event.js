import { selectAllElement } from './dom';
import { pipe } from './pipe';

export const bindEvent = selector => eventType => (...fn) => {
  const elements = selectAllElement(selector);
  elements.forEach(element => {
    element.addEventListener(eventType, pipe(...fn));
  })
}
