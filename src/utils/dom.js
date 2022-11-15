export const findElement = (selector, fromElement = document) => {
  return fromElement.querySelector(selector);
};
