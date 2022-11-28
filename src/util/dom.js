import { AppSelector, opacityClass } from "../template/selector";

export const $ = document.querySelector.bind(document);
export const $$ = document.querySelectorAll.bind(document);

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

export const setRenderTarget = (parentEl) => (template) => parentEl?.insertAdjacentHTML('beforeend', template);
export const renderWrapper = (parentEl) => (template) => {
  return function() {
    setRenderTarget(parentEl)(template);
  }
}

export const getTargetQuerySelector = (targetEl) => (selector) => {
  const wrapper = targetEl.querySelector(selector);

  return wrapper.querySelector.bind(wrapper);
}

export const removeClass = (className) => target => target.classList.remove(className);
export const addClass = className => target => target.classList.add(className);
export const toggleClass = className => target => target.classList.toggle(className);

export const activateButton = target => {
  removeClass(opacityClass)(target);
  target.style.cursor = 'pointer';
}

export const deactivateButton = target => {
  addClass(opacityClass)(target);
  target.style.cursor = '';
}

export const addClickEventListener = (el, callback) => el.addEventListener('click', callback);

export const addTargetsClickListener = (_targetElements, callback = () => {}) => {
  const targetElements = Array.isArray(_targetElements) ? _targetElements : [_targetElements];
  
  targetElements.forEach(el =>  el.addEventListener('click', callback));
}
