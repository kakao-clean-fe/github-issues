import { storeKey } from './constant';
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
    const [label] = store.useState(storeKey.labelForm);
    localStorage.setItem(localStorageKey.createForm, JSON.stringify(label));
  });
}

export function loadCreateForm() {
  const savedForm = localStorage.getItem(localStorageKey.createForm);
  return savedForm ? JSON.parse(savedForm) : {};
}