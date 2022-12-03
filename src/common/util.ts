import { Api } from '../../types';
import { API_METHOD } from './constants';
import FetchController from './FetchController';

export const isEquals = <T = any>(a: T, b: T) => {
  try {
    if (typeof a !== typeof b) {
      return false;
    } else if (Object.keys(a).length !== Object.keys(b).length) {
      return false;
    }
    if (
      typeof a === 'string' ||
      typeof a === 'number' ||
      typeof a === 'boolean'
    ) {
      return a === b;
    } else {
      return Object.keys(a).reduce((prev, key) => {
        return prev && a[key] === b[key];
      }, true);
    }
  } catch (error) {
    return false;
  }
};

export const pipe =
  (...fns) =>
  (args?: any) =>
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
    (prev, [keys, values]) =>
      values ? { ...prev, [`${keys}`]: values } : prev,
    {}
  );

export const API = {
  GET<T = any>({ url, errorMessage }: Api) {
    return FetchController.fetch<T>(
      {
        url,
        method: API_METHOD.GET,
        errorMessage,
      },
      true
    );
  },
  POST<T = any>({ url, body, errorMessage }: Api) {
    return FetchController.fetch<T>({
      url,
      method: API_METHOD.POST,
      body: JSON.stringify(body),
      errorMessage,
    });
  },
  DELETE<T = any>({ url, errorMessage }: Api) {
    return FetchController.fetch<T>({
      url,
      method: API_METHOD.DELETE,
      errorMessage,
    });
  },
  UPDATE<T = any>({ url, errorMessage }: Api) {
    return FetchController.fetch<T>({
      url,
      method: API_METHOD.UPDATE,
      errorMessage,
    });
  },
};

export const getTimeByKor = (now: Date) =>
  new Intl.DateTimeFormat('ko', { timeStyle: 'medium' }).format(now);

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
