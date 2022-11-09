import { curry } from './index';

export const setInnerHTML = curry(function (html, element) {
  element.innerHTML = html;
  return element;
});
export const setInnerText = curry(function (text, element) {
  element.innerText = text;
  return element;
});
export const setEvent = curry(function (type, listener, element) {
  element.addEventListener(type, listener);
  return element;
})
export const addClass = curry(function (className, element) {
  element.classList.add(className);
  return element;
})
export const removeClass = curry(function (className, element) {
  element.classList.remove(className);
  return element;
})
