
export const selectElement = querySelector => document.querySelector(querySelector);
export const selectAllElement = querySelector => document.querySelectorAll(querySelector);

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