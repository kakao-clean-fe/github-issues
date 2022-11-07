import { pipe } from './pipe';

export const bindEvent = selector => eventType => (...fn) => {
  const element = selectElement(selector);
  element.addEventListener(eventType, pipe(...fn));
}
