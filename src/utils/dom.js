
export const selectElement = (querySelector, root = document) => root.querySelector(querySelector);
export const selectAllElement = (querySelector, root = document) => root.querySelectorAll(querySelector);

export const renderElement = querySelector => innerHTML => {
  selectElement(querySelector).innerHTML = innerHTML;
};

export const addClass = className => selector => {
  selectElement(selector).classList.add(className);
};

export const removeClass = className => selector => {
  selectElement(selector).classList.remove(className);
};

export const hasClass = className => element => {
  return element.classList.contains(className);
};

export const toggleClass = (element, className) => {
  const selectedElement = selectElement(element);

  if (selectedElement) {
    return selectElement(element).classList.toggle(className);
  }
}

export const addEventListener = eventType => (selector, handler) => {
  selectElement(selector).addEventListener(eventType, handler);
};