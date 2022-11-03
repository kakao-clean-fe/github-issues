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

export const getPromiseData = (url) => {
  return fetch(url).then(res => res.json())
}

export const pipe = (...args1) => {
  return (...args2) => args1.reduce((acc, fn) => fn(acc), args2);
}