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

const throwIfNotAbortError = error => {
  if(error.name !== 'AbortError') {
    throw error;
  }
}

/** 요청이 완료되기전에 재시도하면 기존 요청은 취소하고 다시 요청하는 fetchBody */
const abortableFetchBody = (() => {
  
  let controller;
  let requested = false;
  
  return (url, options = {}) => {
    if(requested) {
      controller.abort();
    }
    controller = new AbortController();
    const {signal} = controller;
    const _options = {...options, signal};
    requested = true;
    fetchBody(url, _options).catch(throwIfNotAbortError)
    .finally(() => requested = false);
  }
})()

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
  if(typeof value !== 'string') {
    throw new Error('문자열로 바꿔서 저장 바랍니다.');
  }
  localStorage.setItem(key, value);
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
  abortableFetchBody,
  pipe,
  cacheFunction,
  getRandomColor,
  Lazy,
  setLocalStorage,
  getLocalStorage
};
