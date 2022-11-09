export function curry(fn) {
  return function curryFn(...args1) {
    if (args1.length >= fn.length) {
      return fn(...args1);
    } else {
      return (...args2) => curryFn(...args1, ...args2);
    }
  }
}

export function pipe(...functions) {
  return args => {
    return functions.reduce((arg, nextFn) => {
      return nextFn(arg);
    }, args);
  }
}

export function htmlToElement(html) {
  const template = document.createElement('template');
  html = html.trim();
  template.innerHTML = html;
  return template.content.firstChild;
}

export function createAppendChild(targetSelector) {
  const target = document.querySelector(targetSelector);
  return (element) => {
    if (target && element) {
      target.appendChild(element);
    }
  }
}

export function removeChildren(target) {
  if (!target) return;
  target.innerHTML = '';
}

// create boolean function finding same status
export function createIssueStatus(status) {
  return function (issue) {
    return issue?.status === status;
  }
}
