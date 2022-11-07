import { Api } from '../types';
import { API_METHOD } from './constants';

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

const removeUndefinedParam = (obj: object) =>
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
