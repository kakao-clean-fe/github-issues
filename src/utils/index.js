const render = (selector, html) =>
  (document.querySelector(selector).innerHTML = html);

const on = (selector, eventType, callback) =>
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

const MAX_VALUE = 16777216;
const getRandomColor = () => {
  const number = Math.round(Math.random() * MAX_VALUE);
  return `#${number.toString(16)}`;
}

/** 
 * 함수 호출시, 이전 input과 같은 input이 들어오면 캐시된 값을 리턴한다.
 */
const cacheFunction = (fn) => {
  let prevInput = null;
  let cachedOutput = null;
  return (...input) => {
    if (prevInput === input) {
      return cachedOutput;
    }
    prevInput = input;
    cachedOutput = fn(...input);
    return cachedOutput;
  };
};

export {
  render,
  on ,
  addClassList,
  removeClassList,
  fetchBody,
  pipe,
  cacheFunction,
  getRandomColor,
};
