
export const selectElement = querySelector => document.querySelector(querySelector);
export const selectAllElement = querySelector => document.querySelectorAll(querySelector);

export const renderElement = querySelector => innerHTML => {
  selectElement(querySelector).innerHTML = innerHTML;
};

