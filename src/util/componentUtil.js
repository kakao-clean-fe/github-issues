export const $ = (selector) => {
  return document.querySelector(selector);
}

export const clearElement = (targetSelector) => {
  const target = $(targetSelector);
  
  if (!target) return;

  while (target.lastElementChild) {
    target.removeChild(target.lastElementChild);
  }
}

export const renderTemplate = (parent, template) => {
  parent?.insertAdjacentHTML('beforeend', template);
}

export const setRenderTarget = (parent) => (template) => parent?.insertAdjacentHTML('beforeend', template);

// args2는 배열 아닌 인자
export const compose = (...args1) => {
  return (args2) => args1.reduceRight((acc, fn) => fn(acc), args2);
}

export const pipe = (...args1) => {
  return (...args2) => args1.reduce((acc, fn) => fn(acc), args2);
}
