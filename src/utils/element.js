export const getElement = (selector) => document.querySelector(selector);
export const clearInnerHTML = (element) => element.innerHTML = '';
export const convertTemplateToElement = (template) => {
  const $div = document.createElement('div');
  $div.innerHTML = template.trim();

  return $div.firstChild;
}
