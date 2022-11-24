import { ABORT_ERROR, GET, POST, TEMP_LABEL_FORM_DATA_KEY } from "../const";
import { $ } from "./dom";
import { multipleArgsPipe, pipe } from "./operator";

export const getRandom = (arr) => {
  return Math.floor(Math.random() * arr.length);
}

export const isHexColor = (value) => {
  return /^#[0-9A-F]{6}$/i.test(value);
}

export const isValid = (target) => target.validity.valid;

export const setInputValue = (selector, newValue) => {
  const target = $(selector);

  if (!target || target.value === newValue) {
    return;
  }

  target.value = newValue;
}
/**
 * local storage 관련
 */
export const getTargetStorageItem = (key) => {
  return {
    get() {
      return localStorage.getItem(key);
    },
    set(value) {
      localStorage.setItem(key, value);
    },
    remove() {
      localStorage.removeItem(key);
    }
  }
}

export const getFormStorage = () => getTargetStorageItem(TEMP_LABEL_FORM_DATA_KEY);

/**
 * http service 관련
 */
const abortControllerObj = {};

const getControllerKey = (url, method) => url + ' ' + method;

/**
 * 
 * signal: AbortSignal {aborted: true/false, reason: undefined, onabort: null} 
 * @returns signal
 */
const checkIsRequesting = (key) => {
  let target = abortControllerObj[key];
  
  if (!target) {
    abortControllerObj[key] = new AbortController();
    return abortControllerObj[key].signal;
  }
  
  target.abort();
  abortControllerObj[key] = new AbortController();

  return abortControllerObj[key].signal;
}

/**
 * @returns {status, data, isAborted, isOtherError}
 */
const httpService = async ({url, httpServiceCallback}) => {
  try {
    const res = await httpServiceCallback(url);
    const {status} = res;
    
    return {
      status, 
      data: [200,201].includes(status) ? await res.json() : null,
      isAborted: false,
      isOtherError: false,
    };
  } catch(err) {
    if (err.name === ABORT_ERROR) {
      return {status: null, data: null, isAborted: true, isOtherError: false}
    }

    return {status: null, data: null, isAborted: false, isOtherError: true};
  }
}

const getRequest = async ({url, signal}) => {
  return httpService({
    url, 
    httpServiceCallback: () => fetch(url, {signal})
  });
}

const postRequest = async ({url, postData: data, signal}) => {
  return httpService({url, httpServiceCallback: () => fetch(url, {
    method: POST,
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data),
    signal
  })});
}

/**
 * @returns {status, data, isAborted, isOtherError}
 */
export const fetchStoreData = (store) => (url) => async (method = GET, postData) => {
  // 중복 요청이라면 이전 요청 abort
  const signal = multipleArgsPipe(getControllerKey, checkIsRequesting)(url, method);
  
  if (method === GET) {
    const {status, data, isAborted, isOtherError} = await getRequest({url, signal});
    
    !isAborted && store.setValue(data);
    return {status, data, isAborted, isOtherError};
  }

  if (method === POST) {
    return await postRequest({url, postData, signal}) 
  }
}