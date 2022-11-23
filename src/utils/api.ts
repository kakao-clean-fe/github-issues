import { APIArgs, Method } from '~/types/utils/api';
import { abortFetchController } from './abort-fetch-controller';

const getAbortKey = ({ method, url }: { method: Method, url: string }): string => `${method} ${url}`;

const handleAbortAndGetSignal = (key: string): AbortSignal => {
  abortFetchController.cancelPendingRequest(key);
  return abortFetchController.create(key).signal;
};

const baseFetch = async <T>({ url, headers = {}, options = {}, method, abort = false }: APIArgs): Promise<T> => {
  const signal = abort ? handleAbortAndGetSignal(getAbortKey({ method, url })) : undefined;
  const requestOption = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    signal,
    ...options
  };
  const response = await fetch(url, requestOption);

  return await (response.json() as Promise<T>);// parses JSON response into native JavaScript objects
};

const setMethod = (method: Method) => async <T>(args: Omit<APIArgs, 'method'>): Promise<T> => await baseFetch({ method, ...args });

export const getAPI = setMethod('GET');
export const postAPI = setMethod('POST');
export const putAPI = setMethod('PUT');
export const deleteAPI = setMethod('DELETE');
