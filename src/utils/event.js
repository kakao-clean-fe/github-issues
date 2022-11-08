import { selectAllElement } from './dom';
import { pipe } from './pipe';
import { EVENT } from '../constants/event';

export const bindClickEvent = selector => (...fn) => {
  const elements = selectAllElement(selector);
  elements.forEach(element => {
    element.addEventListener(EVENT.CLICK, pipe(...fn));
  })
}
