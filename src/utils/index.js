const render = (selector, html) =>
  (document.querySelector(selector).innerHTML = html);

const on = ({
  element = document,
  selector, 
  eventType, 
  callback
}) =>
element.querySelector(selector).addEventListener(eventType, callback);

const addClassList = ({
  element = document,
  selector, 
  classes
}) =>
element.querySelector(selector).classList.add(classes);
const removeClassList = ({
  element = document,
  selector, 
  classes
}) =>
element.querySelector(selector).classList.remove(classes);

const fetchBody = (url, options={}) => fetch(url, options).then((response) => response.json());
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

const Lazy = (importFunc) => {
  let LazyComponent;
  return function (...args) {
    if(!LazyComponent) {
      return importFunc().then(module => LazyComponent = module.default).then(LazyComponent => this.component = new LazyComponent(...args))
    }
    this.component = new LazyComponent(...args);
  }
}

const setLocalStorage =(key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
}

const getLocalStorage = (key, {isJson} = {isJson:true}) => {
  const value = localStorage.getItem(key);
  if(value && isJson) {
    return JSON.parse(value);
  }

  return value;
}

export {
  render,
  on ,
  addClassList,
  removeClassList,
  fetchBody,
  pipe,
  cacheFunction,
  getRandomColor,
  Lazy,
  setLocalStorage,
  getLocalStorage
};
