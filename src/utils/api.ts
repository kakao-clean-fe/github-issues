import { APIArgs, Method } from '~/types/utils/api';
import { abortFetchController } from '~/utils/abort-fetch-controller';
import { fetchErrorHandler } from '~/utils/api-error';

const getAbortKey = ({ method, url }: { method: Method, url: string }): string => `${method} ${url}`;

const handleAbortAndGetSignal = (key: string): AbortSignal => {
  abortFetchController.cancelPendingRequest(key);
  return abortFetchController.create(key).signal;
};

const baseFetch = async <Data>({ url, headers = {}, options = {}, method, abort = false }: APIArgs): Promise<Data | Error | Response> => {
  const signal = abort ? handleAbortAndGetSignal(getAbortKey({ method, url })) : undefined;
  const requestOption = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    signal,
    ...options,
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined
  };

  return await new Promise((resolve, reject) => {
    fetch(url, requestOption)
      .then(async (response: Response) => {
        const data = await response.json();
        if (response.ok) {
          resolve(data as Data);
        } else {
          console.error(response.statusText, response);
          fetchErrorHandler(response);
          reject(response);
        }
      })
      .catch((error: Error) => {
        console.error(error);
        fetchErrorHandler(error);
        reject(error);
      });
  });
};

const setMethod = (method: Method) => async <T>(args: Omit<APIArgs, 'method'>): ReturnType<typeof baseFetch<T>> => await baseFetch({ method, ...args });

export const getAPI = setMethod('GET');
export const postAPI = setMethod('POST');
export const putAPI = setMethod('PUT');
export const deleteAPI = setMethod('DELETE');
