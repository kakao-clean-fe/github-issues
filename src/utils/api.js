import { asyncPipe } from "./fp"; 

const signalKeyMap = new Map();

const abortSignalController = () => {
  const hasSignal = (signalKey) => signalKeyMap.has(signalKey);
  const getSignal = (signalKey) => signalKeyMap.get(signalKey);

  const handleAbortSignal = (key) => {
    if(hasSignal(key)) {
      getSignal(key).abort();
    } 

    const newController = new AbortController();
    signalKeyMap.set(key, newController);
  }

  return {
    hasSignal,
    getSignal,
    handleAbortSignal,
  }
}

export const commonAPI = (() => {
  const request = (url, option = {}) => asyncPipe(() => fetch(url, option), response => response.ok ? response.json() : Promise.reject(response.json()))(url, option);

  const handleResponse = (response) => {
    return response;
  }

  const handleError = (response) => {
    console.error(response);

    Promise.reject(response.json());
  }

  const {hasSignal, getSignal, handleAbortSignal} = abortSignalController();
  const commonFetch = (config) => {
    const {url, method, body, option} = config;
    const signalKey = option?.signalKey;

    if(signalKey) {
      handleAbortSignal(signalKey);
    }

    const signal = signalKey && hasSignal(signalKey) && getSignal(signalKey).signal;

    return request(url, {method, body, signal, ...option})
    .then(response => handleResponse(response))
    .catch(error => handleError(error))
  }

  return {
    get: (url, option) => {
      return commonFetch({url, method: 'GET', option});
    },
    post: (url, body, option) => {
      return commonFetch({url, method: 'POST', body: JSON.stringify(body), option})
    }
  }
})()
