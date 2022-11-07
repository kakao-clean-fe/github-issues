
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