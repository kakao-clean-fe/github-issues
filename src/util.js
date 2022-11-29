import { localStorageKey } from './constant';

export function $(selector) {
  return document.querySelector(selector);
}

export function isOpenedIssue(issue) {
  return issue.status === 'open';
}

export function isClosedIssue(issue) {
  return issue.status === 'close';
}

export function getRandomColor() {
  return `#${parseInt(Math.random() * parseInt('ffffff', 16)).toString(16)}`;
}

export function saveCreateFormBeforeUnload(store) {
  window.addEventListener('beforeunload', () => {
    const label = store.getState(state => state.labelForm);
    localStorage.setItem(localStorageKey.createForm, JSON.stringify(label));
  });
}

export function loadCreateForm() {
  const savedForm = localStorage.getItem(localStorageKey.createForm);
  return savedForm ? JSON.parse(savedForm) : {};
}

export function withAbortController(callback) {
  let abortController;
  return (...args) => {
    if (abortController) {
      abortController.abort();
    }
    abortController = new AbortController();
    return callback(abortController.signal, ...args);
  }
}

export function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export const convertTemplateToElement = (template) => {
  const $div = document.createElement('div');
  $div.innerHTML = template.trim();
  return $div.firstChild;
}
