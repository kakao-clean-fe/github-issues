import { Api } from '../../types';
import { API_METHOD } from './constants';

export const pipe =
  <P = any, R = any | void>(...fns: ((args: P | R) => R)[]) =>
  (args?: P | R) =>
    fns.reduce((prev, next) => next(prev), args);

export const eventListener = (
  element: Element,
  event: string,
  callback: (e: Event) => void
) => {
  element.addEventListener(event, callback);
};

export const clickEventListener = (
  element: Element,
  callback: (e: Event) => void
) => {
  eventListener(element, 'click', callback);
};

export const removeUndefinedParam = (obj: object) =>
  Object.entries(obj).reduce(
    (prev, { keys, values }) =>
      values ? { ...prev, [`${keys}`]: values } : prev,
    {}
  );

const commonFetch = async <T = any>({
  url,
  method,
  body,
  errorMessage,
}: Api) => {
  const obj = removeUndefinedParam({ method, body });
  try {
    const res = await fetch(url, obj);
    return (await res.json()) as Promise<T>;
  } catch (err) {
    if (errorMessage !== '' && errorMessage) {
      alert(errorMessage);
    }
    throw err;
  }
};

export const API = {
  GET<T = any>({ url, errorMessage }: Api) {
    return commonFetch<T>({ url, method: API_METHOD.GET, errorMessage });
  },
  POST<T = any>({ url, body, errorMessage }: Api) {
    return commonFetch<T>({ url, method: API_METHOD.POST, body, errorMessage });
  },
  DELETE<T = any>({ url, errorMessage }: Api) {
    return commonFetch<T>({ url, method: API_METHOD.DELETE, errorMessage });
  },
  UPDATE<T = any>({ url, errorMessage }: Api) {
    return commonFetch<T>({ url, method: API_METHOD.UPDATE, errorMessage });
  },
};

export const findElement = (rootElement: Element) => (querySelector: string) =>
  rootElement.querySelector(querySelector);

export const findElementAll =
  (rootElement: Element) => (querySelector: string) =>
    rootElement.querySelectorAll(querySelector);

export const setInnerHTML = (element: Element) => (innerHTML: string) => {
  if (element.innerHTML !== innerHTML) element.innerHTML = innerHTML;
};

const primitiveProxyGetter = (target: object, key: string | symbol) => {
  if (!target.hasOwnProperty(key) && typeof target[key] === 'function') {
    return function (...args) {
      return target[key]();
    };
  }
  return target[key];
};
export const getNumberProxy = <T = number>(number: T) => {
  return new Proxy(new Number(number), {
    get(target, key) {
      return primitiveProxyGetter(target, key);
    },
  });
};

export const getStringProxy = <T = string>(str: T) =>
  new Proxy(new String(str), {
    get(target, key) {
      return primitiveProxyGetter(target, key);
    },
  });
export const getBooleanProxy = <T = boolean>(bool: T) =>
  new Proxy(new Boolean(bool), {
    get(target, key) {
      return primitiveProxyGetter(target, key);
    },
  });

export const getObjectProxy = <T = any>(obj: T) =>
  new Proxy(obj as unknown as object, {
    get(target, prop) {
      return target[prop];
    },
  });

export const getProxy = <T = any>(initData: T) => {
  let _data;
  switch (typeof initData) {
    case 'string':
      _data = getStringProxy(initData);
      break;
    case 'number':
      _data = getNumberProxy(initData);
      break;
    case 'boolean':
      _data = getBooleanProxy(initData);
      break;
    default:
      _data = getObjectProxy(initData);
      break;
  }
  return _data;
};

window['pipe'] = pipe;
