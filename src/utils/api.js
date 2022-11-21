import { asyncPipe } from "./fp"; 

export const commonAPI = (() => {
  const request = (url, option = {}) => asyncPipe(() => fetch(url, option), response => response.ok ? response.json() : Promise.reject(response.json()))(url, option);

  const handleResponse = (response) => {
    return response;
  }

  const handleError = (response) => {
    console.error(response);

    Promise.reject(response.json());
  }

  const commonFetch = (config) => {
    const {url, method, body} = config;

    return request(url, {method, body})
    .then(response => handleResponse(response))
    .catch(error => handleError(error))
  }

  return {
    get: (url) => {
      return commonFetch({url, method: 'GET'});
    },
    post: (url, body) => {
      return commonFetch({url, method: 'POST', body: JSON.stringify(body)})
    }
  }
})()