import { curry } from './index';

export const appendChild = curry((html, element) => {
  element.appendChild(html);
  return element;
})
export const setInnerHTML = curry((html, element) => {
  element.innerHTML = html;
  return element;
});
export const setInnerText = curry((text, element) => {
  element.innerText = text;
  return element;
});
export const setEvent = curry((type, listener, element) => {
  element.addEventListener(type, listener);
  return element;
});
export const addClass = curry((className, element) => {
  element.classList.add(className);
  return element;
});
export const removeClass = curry((className, element) => {
  element.classList.remove(className);
  return element;
});
export const setStyle = curry((styles, element) => {
  Object.entries(styles).forEach(([key, value]) => {
    element.style[key] = value;
  });
  return element;
});
export const setAttribute = curry((attrs, element) => {
  Object.entries(attrs).forEach(([key, value]) => {
    element[key] = value;
    return element;
  });
});
export const isDescendant = curry((child, parent) => {
  let node = child;
  while (node != null) {
    if (node == parent) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
});
