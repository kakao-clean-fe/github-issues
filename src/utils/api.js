import { asyncPipe } from "./fp"; 

const FetchMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
}

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
  const request = (url, option = {}) => asyncPipe(
    () => fetch(url, option),
    response => {
      if(response.ok) {
        return response.json();
      }
      return response.json().then(error => Promise.reject(error))
    }
  )(url, option);

  const handleResponse = (response) => {
    return Promise.resolve(response);
  }

  const handleError = (error) => {
    console.error(error);

    return Promise.reject(error);
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
      return commonFetch({url, method: FetchMethod.GET, option});
    },
    post: (url, body, option) => {
      return commonFetch({url, method: FetchMethod.POST, body: JSON.stringify(body), option})
    }
  }
})()
