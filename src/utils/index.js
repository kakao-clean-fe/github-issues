const render = (selector, html) =>
  (document.querySelector(selector).innerHTML = html);

const addEventListener = (selector, eventType, callback) =>
  document.querySelector(selector).addEventListener(eventType, callback);

const addClassList = (selector, classes) =>
  document.querySelector(selector).classList.add(classes);
const removeClassList = (selector, classes) =>
  document.querySelector(selector).classList.remove(classes);

const fetchBody = (url) => fetch(url).then((response) => response.json());
const pipe = (...fns) => {
  return (args) =>
    fns.reduce((acc, fn) => {
      return fn(acc);
    }, args);
};

export { render, addEventListener, addClassList, removeClassList, fetchBody, pipe };