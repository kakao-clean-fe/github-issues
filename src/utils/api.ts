import { ApiArgs, Method } from '~/types/utils/api';
import { abortFetchController } from './abort-fetch-controller';

const getAbortKey = ({ method, url }: { method: Method, url: string }): string => `${method} ${url}`;

const handleAbortAndGetSignal = (key: string): AbortSignal => {
  abortFetchController.cancelPendingRequest(key);
  return abortFetchController.create(key).signal;
};

const baseFetch = async <T>({ url, headers = {}, options = {}, method, abort = false }: ApiArgs): Promise<T> => {
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

const setMethod = (method: Method) => async <T>(args: Omit<ApiArgs, 'method'>): Promise<T> => await baseFetch({ method, ...args });

export const getApi = setMethod('GET');
export const postApi = setMethod('POST');
export const putApi = setMethod('PUT');
export const deleteApi = setMethod('DELETE');
