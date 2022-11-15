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